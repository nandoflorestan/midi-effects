There are a few jesuscript MIDI plugins in this repository.

JSFX scripts are directly supported by Reaper.  If you use another DAW, you can run them through
https://www.reaper.fm/reaplugs/

Below I talk about only the most interesting MIDI effects in this repo.


Interferic
==========

https://github.com/nandoflorestan/midi-effects/blob/master/jesuscript/interferic.jsfx

A JSFX plugin that watches the values of CC1 and CC4 and outputs something to CC1, hiding CC4.
The output is given by (CC1value + CC4value - 64). But my purpose is simply to control dynamics in two passes.
First I input generic, linear crescendos and decrescendos on CC1 while I am composing. It's the main shape and I never touch it again
unless it is something that I would change in notation (a drastic change). And I keep CC4 static in the middle (64).
For the 2nd pass -- tweaking the performance -- I add CC4 changes which start and end in the middle. These are interferences to:

1. Tweak the temporary loudness of an instrument to better match the others;
2. Tweak the temporary loudness of an instrument to bring it out when appropriate;
3. Accelerate or decelerate a crescendo or decrescendo;
4. Add randomness without mixing it into the main CC1 signal, so one can be edited separately from the other.

You could also route a single midi track to each of the ensemble tracks, to control dynamics of the whole section from a single place,
and then just add minor adjustments to each track individually.

Currently this plugin watches only a single MIDI channel that you choose.
I wrote a multichannel version using Protoplug, but currently it's not stable.
JSFX is a barbaric language to write programs in; I would prefer Lua, but unfortunately Protoplug is giving me trouble:
https://github.com/pac-dev/protoplug/issues/47
Help appreciated.
