Final Project - Interactive Data Visualization

### Project Screen-Cast

Each team will create a two minute screen-cast with narration showing a demo of your visualization and/or some slides. 

You can use any screencast tool of your choice, such as Camtasia or Loom (new and recommended). 
Please make sure that the sound quality of your video is good -- it may be worthwhile to invest in an external USB microphone-- campus IT should have some you can borrow. 
Upload the video to an online video-platform such as YouTube or Vimeo and embed it into your project web page. 
For our final project presentation day, we will show as many videos in class as possible, and ask teams to field questions.

We will strictly enforce the two minute time limit for the video, so please make sure you are not running longer. 
Use principles of good storytelling and presentations to get your key points across. Focus the majority of your screencast on your main contributions rather than on technical details. 
What do you feel is the best part of your project? 
What insights did you gain? 
What is the single most important thing you would like your audience to take away? Make sure it is front and center rather than at the end.

Outside Libraries/References


Store the following in your GitHub repository:

- Code - All web site files and libraries assuming they are not too big to include
- Data - Include all the data that you used in your project. If the data is too large for github store it on a cloud storage provider, such as Dropbox or Yousendit.
- Process Book- Your Process Book in PDF format.
- README - The README file must give an overview of what you are handing in: which parts are your code, which parts are libraries, and so on. The README must contain URLs to your project websites and screencast videos. The README must also explain any non-obvious features of your interface.

References
---

Our project consisted of gathering NBA team data from the 2022-23 season. This data was collected using the nba_api repository by swar patel. The backend directory holds the python
script used to gather this data in stats_by_year.py. The result of the script is in the public folder under the file name 2022_team_stats.csv. We also had a csv file containing each nba teams stats from 2000-2023 but the file was not used due to the complexity. From there we designed a react application
to show our data. We created react components for Barcharts, PieCharts, and the Scatterplot. We also used D3 in each of these components to visualize them. Our home page on the website provides animated and interactable charts to be used. The bar charts plot different stats like points, wins, losses, rebounds, and assists. We also used a tooltip to better format everything

nba_api link: https://github.com/swar/nba_api
