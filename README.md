<p align="center">
  <img src="./logo.png" alt="Outcast Logo"/>
</p>

# Outcast
This is the repository of the Grim Dawn &amp; Farthest Frontier Community Discord Bot.

# Repository Specifics

* The folder modules/ contains all main functionalities of the bot, split by folder and module.
* The folder modules/forumTracker/posts contains all Crate Forum tracked posts. *I recommend updating these files first yourself if you want to use this bot to any extend, otherwise it will post every post since the beginning of the forum.*

# Development History
The original version *(and the idea)* of this bot was written by [evanronnei (Kidpid)](https://github.com/evanronnei/OutcastBot) in ~2016 with C Sharp. He hosted the bot on his Rasperry Pi first, for several months.
The C Sharp library used for the Bot got regularly outdated and caused a lot of work to update the bot every month. That was unsustainable for the long term.

I ([nxPublic](https://github.com/nxPublic)) decided to re-write it in Javascript and add a few more things to its functionality and curated it for the past 4 years.
Some of that added functionality wich older versions of the Outcast had, are not included in this repository, usually there are very good reasons for the missing parts. 
We will add everything from the original bot over time to this repository where it makes sense to update the code.

Now entering the stage of LTS and the approach of the release of Farthest Frontier (Crate Entertainments second game after Grim Dawn), it is clear that i cannot curate this project alone and neither do i want people to be dependend on me.

I have the hope that the the Grim Dawn & Farthest Frontier community can work together and report issues/bugs, maybe even fix them themself in this repository.

# Hosting
As soon as this repository reaches a acceptable and working stage, i will create a Branch that will auto deploy to the Root server on Branch change.
That should ensure that the latest state of the Repository is always the one running on the Server.
