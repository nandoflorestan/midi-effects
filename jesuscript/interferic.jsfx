desc: CC to interfere with dynamic CC
// written by Nando Florestan.
// This effects eats up CC4 messages.  It uses these to make relative changes to CC1 values.
// The CC1 output is given by CC1value + CC4value - 64.
// You can keep CC4 centered at 64 and occasionally change it to correct CC1 while
// keeping these corrections separate from the main CC1 signal.
// TODO: Make this affect a range of channels, not just one.

// MIDI-only effect
in_pin:none
out_pin:none

slider1:  1 <1,  16, 1> Channel
slider2:  1 <1, 127, 1> Dynamic CC
slider3: 64 <0, 127, 1> Dynamic value
slider4:  4 <1, 127, 1> Interferic CC
slider5: 64 <0, 127, 1> Interferic value
slider6: 64 <0, 127, 1> Result

@init

@slider
channel = slider1;
dynamic_cc = slider2;
dynamic_value = slider3;
interferic_cc = slider4;
interferic_value = slider5;
result = slider6;

@block
while (midirecv (blockOffset, status, databytes) ? (
	channelNum = (status & 15) + 1;  // channel portion of status
	msgNum = status & 240;            // message # portion of status, times 16
	isCCmsg = (msgNum == 11*16);       // 11 = control change message #
	channelNum == channel && isCCmsg ? (
		CCnum = databytes & 127;
		CCnum == dynamic_cc ? (
			dynamic_value = (databytes / 256) | 0;
			slider3 = dynamic_value;
		); 
		CCnum == interferic_cc ? (
			interferic_value = (databytes / 256) | 0;
			slider5 = interferic_value;
		); 
		CCnum == dynamic_cc  ||  CCnum == interferic_cc ? (
			// Send the modified CC value
			// result = dynamic_value + interferic_value - 64;
			result = min(127, max(0, (dynamic_value + (interferic_value - 64)))) | 0;
			slider6 = result;
			midisend(blockOffset, status | 0, (result * 256 + dynamic_cc) | 0);
		) : (
			midisend(blockOffset, status | 0, databytes | 0);  // pass MIDI through
		);
	) : (
		midisend(blockOffset, status | 0, databytes | 0);  // pass MIDI through
	);
	1;  // Force while() to loop as long as midirecv() is true
));
