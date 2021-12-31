desc: Filter MIDI channels to ignore some channels
// written by Nando Florestan 

// MIDI-only effect
in_pin:none
out_pin:none

slider1: 1 <1, 16, 1> First channel  # to pass
slider2: 16 <1, 16, 1> Last channel

@block

while (midirecv (blockOffset, status, databytes) ? (
   channelNum = (status & 15) + 1;  // channel portion of status
   channelNum >= slider1 && channelNum <= slider2 ? (
      midisend (blockOffset, status | 0, databytes | 0);
   );
   1;  // Force while() to loop as long as midirecv() is true
));
