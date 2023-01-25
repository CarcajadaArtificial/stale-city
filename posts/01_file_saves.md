---
title: File saves in Rust
published_at: 2022-10-31
snippet: Determining a correct flow of information that includes weather information processing, world creation, world edition, saving progress, and loading a `save.ron` file.
---

Determining a correct flow of information that includes weather information processing, world creation, world edition, saving progress, and loading a `save.ron` file.

Let's start with weather information processing. Simulating weather using any calculation is out of the question, I'd rather download data from real sources than simulate them. I used [Visual Crossing](visualcrossing.com) query builder to obtain any given region's weather history. A year-long report with every record being one-hour totals 8,760 records. Every record contains temperature (°C), relative humidity (%), solar radiation (W/m2), and precipitation (mm) values. Every value must be converted to a 4-bit integer, no matter the unit it's measured with. Now that the weather file is "distilled" to a `.csv` file with one record per hour containing four 4-bit integers from Jan 1st 00:00 to Dec 31st 23:00.

The world creation process must be very straightforward. I must input the world's dimensions to create an empty box, with a layer of weather blocks on top, a layer of bedrock on the bottom, and walls of glass surrounding it. All three of these blocks must be uneditable and the contained space must be filled with air blocks. The created world must be instantly visualized, starting the simulation on pause mode.

Then I must be able to change any blocks inside the editable space. During the world editing phase, I must be able to save the world's progress, so I can attempt small variations of the world without having to create it all from scratch every time. The challenge in this particular moment is using the weather information every hour. Inside this process, I imagine the world loop's first action to check if this tick is the first of the hour, and if it is, it updates the weather blocks' values. How can I access the weather information when the simulation requires it to?

1. Every hour the app must access the `weather.csv` file and look for the row with the next record to be used. The next record to be read must be derived from the global value of total ticks since the start of the simulation. Divided by 60 for minutes and another time for hours.
2. Before even running the simulation transform the `weather.csv` file to `weather.ron`. This makes the object notation native to rust and must be faster than accessing the CSV. Even though, there must be a similar calculation to store the next record number.
3. Finally, another way to process the weather information is by creating the `.ron` file and adding its entirety to the app's state. This way all number values will already be set to the correct 4-bit unit and there won't be any processing happening during the simulation.

## Tasks

- The system's interface must start with a _New World_ screen if the file `~/saves/world.save.ron` does not exist. If it does, just display a success state.
- The system must visually display if there is a file `~/saves/weather.save.ron` that exists and enable the _Create World_ button if it does.
- When clicking the _Create World_ button, the system must create the `~/saves/world.save.ron` file and display a success state when it does.
- **Bonus: ** Create a visualizer for the daily or hourly weather.


## Next up

- 2D rendering of the world.