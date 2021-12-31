desc: converts CC messages to pitch bend messages
// CC2pitchbend by Kite Giedraitis 

// MIDI-only effect
in_pin:none
out_pin:none

slider1: 0 <0, 16, 1> midi in channel (0 = all channels)
slider2: 114 <0, 127, 1> midi CC # to convert
slider3: 1 <0, 2, 1{ bend up only, bend up and down, bend down only}> usage

@block

while (midirecv (blockOffset, status, databytes) ? (
   msgNum = status & 240;                   		// message # portion of status, times 16
   channelNum = status & 15;            		// channel portion of status
   CCnum = databytes & 127; 
   CCvalue = (databytes / 256) | 0;
   isCCmsg = (msgNum == 11*16);            		// 11 = control change message #
   (channelNum == slider1 - 1) || (slider1 == 0) ? (   	// midi on "our" channel?
      isCCmsg && CCnum == slider2 ? (
         msgNum = 14 * 16;				// 14 = pitch bend
         slider3 == 0 ? databytes = 64 + CCvalue / 2;  	// bend up only
         slider3 == 1 ? databytes = CCvalue;	  	// bend up and down
         slider3 == 2 ? databytes = 64 - CCvalue / 2;	// bend down only
         databytes *= 256;				// store bend in the MSB
         CCvalue / 2 > floor (CCvalue / 2) 		// CCval is odd?
         && slider3 != 1 ?				// and we divided CCval in half?
            databytes -= 64;				// convert LSB from 128 to 64
      );
   );
   midisend (blockOffset, (msgNum + channelNum) | 0, databytes | 0);
   1;  // Force while() to loop as long as midirecv() is true
));