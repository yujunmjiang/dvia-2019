## Time Visualizer

The start code provide by [Christian Swinehart](http://samizdat.co/) can be found [here](https://dvia.samizdat.co/2019/right-twice-a-day/)

For this project, the data I will be working with are the numerical aspects of time. The `clock()` function provides an access to the current date & time. The function returns a time object with the current instant broken down into individual components. Therefore, I can get numerical values for `hour`, `min`, `sec`, and `ms` on the time side of things and `year`, `season`, `month`, `moon`, `day`, and `weekday` as big units to track time.

![illustrative images](./season-dial-daytime.png)

This final version of the hygrid clock `Time Visualizer` was inspired by multiple elements such us solar system, orbital revolution, the representative color of each season, and dial plate. The `arc()` creates three concentric circles to track the progress of hour, minute, and second. Meanwhile, each arc has an unique `alpha` value with RGB color mode to distinguish time units visually. The round shape with solid colors in the middle expresses four seasons during the whole year. The background color separates daytime and nighttime into two colors as well.

Time Units: season, a.m., p.m., hour, minute, second

Retinal Variables: shape, value, hue, orientation

![illustrative images](./season-dial-nighttime.png)
