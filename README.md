# Timesheet Calculator

Thoughtworkers need to input their usage of time to the Timesheet, but the system calculate the hours using the decimal system and, at least for me, it's not so intuitive – I do not calculate my time that way daily.

Thanks for the Calculator addapted to the Timesheet way of working I can input my time correctly and without much effort. Except it does not take away my effort 100%.

Every time I use the calculator I need to calculate small periods of time separately and sum them all up mentally. I'm way too lazy to be ping pong-eying through the Google Calendar and the Calculator pages. So I decided to add a new feature to it, as well as to make it more accessible.

## Roadmap

- [x] Previous analysis to detect any lack of accessibility;
- [x] Change the `inputs` layout structure to table;
- [ ] Test the table to assert its accessibility;
- [x] Add single sums to every row;
- [x] Make the `TOTAL HOURS` sum all the single sums up;
- [x] Add a "new row" button;
- [x] Invite a designer to design a new layout to accomodate the new features, and to improve the accessibility;
- [ ] ~~Add a warning to let the assistive technologies know that a new row has been created;~~
- [x] Add label to make the buttons clearer to users of assistive technologies;
- [x] Apply focus to the CHECK IN of the new row when NEW ENTRY button is clicked; 
- [x] Enable line deletion;
- [x] Apply focus in the above CHECK IN of the deleted row;
- [ ] Apply the new design.

## Findings

- The button `copy` had an emoji in the HTML structure, and without descriptive text. I moved it to the CSS sheet and made unreachable to the assistive technologies, due to its lack of semantic value.