## Why i'm creating this video

Recently i started a personal project which involves creating
a Max 4 Live device with dynamic interface and after finding a few limitations
i decided to ask Federico ( who has the channel "Amazing Max Stuff" on youtube )
about how he would go about solving this problem.

Federico "amazingly" replied to my message in no time and just a few days
after published a video showing how to do it using javascript.

You can watch the video here:
https://www.youtube.com/watch?v=4uO6Ft4WuUQ&ab_channel=AmazingMaxStuff

After watching his video and learning about max msp's js function: "getvalueof"
and "setvalueof" i thought it would be a good idea to retribute some of the love
Federico have put into the community by creating a video which will hopefully
help fellow javascripters improve their patches.

Without fuder ado let's jump into the project and see how we could improve 
the javascript part.

## Refactoring Feederico javascript

 -> At 2:44 federico says "We going to create a class"

 In reality there is ( or at least there was ) no "class" in javascript [...]

 According to this page ( which is outdated. anyone knows a more up to date
 version of this page? ) 
 http://max-javascript-reference.tim-schenk.de/symbols/#gsc.tab=0

 Max MSP runs javascript version 1.6 which according to this page was released
 in 2005 https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1-6.html

 -> Javascript best practices "don't use new"

 As pointed out on the w3schools website it's not a good practice to use
 "new" in javascript:
 https://www.w3schools.com/js/js_best_practices.asp

 Using "new" in javascript will create unecessary complications we don't
 really want to deal with.

 By removing this "class" idea we can start working in a more oiled way that
 will make things like the "this." operator disappear and our mind as js
 developer expand. Thinking about functions is the way to go.

 -> add 80 characters ruler

 -> Default value for parameters

 For instance on createMultiSlider we can have a default value of 3 for the
 numberOfSliders parameter.

 -> storing data on a variable state an using the length of the array
 as index

 -> refactoring variables and functions by pressing F2 on VSCode

## Max MSP / JS quirks

 -> "patcher" is global! patcher everywhere!
   https://docs.cycling74.com/max8/vignettes/jsglobal

then try creating a function inside of a function and call "this.patcher" or call
the "patcher" object. will it work?

## One big limitation of dynamic UI with Max 4 Live

 -> If you add live.* objects via this.patcher they won't be automatable as in:
 if you right click it won't show the context menu while objects created
 manually will have the context menu "Show Automation" etcs..

 Please contact support@cycling74.com and support@ableton.com and ask for such
 feature would be great to get it solved so we can truly have dynamic interfaces
 on Max4Live !

## Max MSP / Live / JS Related Links:

Federico's video on dynamic interfaces:
https://www.youtube.com/watch?v=4uO6Ft4WuUQ&ab_channel=AmazingMaxStuff

My 2014 Javascript in Max/MSP presentation:
http://hems.io/max.js/

JavaScript Live API Tutorials
http://compusition.com/writings/js-live-api

## My personal links:

Titrate Records:
https://titraterecords.com/

My latest 12" on Titrate:
https://hems.bandcamp.com/album/chaotic-affair

My 12" on E2-E8:
https://www.juno.co.uk/products/hems-post-radiance/846573-01/

Soundcloud:
https://soundcloud.com/hems

Personal website:
https://hems.io