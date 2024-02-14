# Assignment 3 - Replicating a Classic Experiment  
### *By: Matthew McAlarney, Priyanka Narasimhan, Joe Dobbelaar, and Randy Huang*

README: Priyanka Narasimhan and Matthew McAlarney
Firebase: Joe Dobbelaar
Main UI: Matthew McAlarney
Experiment Questions: Priyanka Narasimhan and Randy Huang


Background
==
In 1984, William Cleveland and Robert McGill published the results of several controlled experiments that pitted bar charts against pies and stacked-bar variants. 
Their paper (http://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-spr/readings/cleveland.pdf) (http://info.slis.indiana.edu/~katy/S637-S11/cleveland84.pdf) is considered a key paper in data visualization.
In particular, they ran a psychology-style experiment where users were shown a series of randomly-generated charts with two graphical elements marked like this:

![cleveland bar chart](img/cleveland-bar.png)

Participants were then asked, "What percentage is the smaller of the larger?". 
This was repeated hundreds of time with varying data and charts. 
By the end of the study, Cleveland and McGill had amassed a large dataset that looked like this:

![cleveland table](img/cleveland-table.png)

We decided to do an experiment using iconographic arrays, where we'd ask questions about the graphs to participants, record their answers, and based on those answers, determine if the graphs were "easy to read/understand" or not. Iconographic arrays or icon arrays are those charts used extensively by the health statisticians to convey things such as the risk of developing breast cancer in the United States between the ages of 20 and 60. They are the images we use when explaining a stat such as "Only one in ten adults get enough fruits and vegetables daily." We are trying to gauge just how easy they are to interpret to the every day citizen, and whether or not people can actually conceptualize the ratios presented in them beyond the literal form given in the images. (I hope this makes sense, but if it doesn't please edit as needed)

### Our Hypothesis 

> The average citizen is not able to interpret an iconographic array beyond the literal meaning. This means for example, that they are unable to apply any ratios they take away from the picture to a different sample size, etc... 

Procedure:
1) Have the participant start the survey.
2) The survey will display a particular iconograph array, before asking the participant to enter an answer to a question.
3) all questions will have straightforward, numeric answers, or a choice between a small set of answers. No short answer or long answer questions are included.
4) There are three different visualizations to test, and about two questions per visualization.
5) The participant will be asked to do the survey about 20 times, and they will be asked to do it two times, at different times of the day, over the course of five days.
6) We are closely following the Cleveland and McGill experiment in terms of style.


(Perhaps we should create additional visualizations with improvements we believe clarify the points made by the icon arrays and then present them to our participants for critiquing. We should do that for the final project so that we have enough time to do a3 to the best of our ability, and so that our work is high quality)

- After each trial, implement code that grades and stores participant’s responses.
  
- At the end of the experiment, to get the data, one easy option: use Javascript to show the data from the current experiment\* (i.e. a comma separated list in a text box) and copy it into your master datafile. See the Background section below for an example of what this file should look like. (\*Alternately implement a server, if you're experienced with that sort of thing.)

** DATA SCIENTISTS! IT IS YOUR TIME TO SHINE **

- Figure out how to calculate "Error", the difference between the true percentage and the reported percentage.
- Scale this error using Cleveland and McGill’s log-base-2 error equation. For details, see the background section (there’s a figure with the equation). This becomes your “Error” column in the output. Make sure you use whole percentages (not decimal) in the log-base-2 equation. Make sure you handle the case of when a person gets the exact percentage correct (log-base-2 of 1/8 is -3, it is better to set this to 0). 
- Run your experiment with 10 or more participants, or-- make sure you get at least 200 trials **per visualization type** in total.  
    - Run at least 20 trials per visualization type, per participant. This is to ensure that you cover the range of possible answers (e.g. 5%, 10%, ..., 95%)
- Make sure to save the resulting CSV after each participant. Compile the results into a master csv file (all participants, all trials).
- Produce a README with figures that shows the visualizations you tested and results, ordered by best performance to worst performance. Follow the modern Cleveland-McGill figure below -- though note that using names instead of icons is fine.
- To obtain the ranking, calculate and report the average log2Error for each visualization across all trials and participants. This should be straightforward to do in a spreadsheet.
- Use Bootstrapped 95\% confidence intervals for your error upper and lower bounds. Include these in your figures. Bootstrapped confidence intervals are easily implemented in R + ggplot2 using the `stat_summary` geom. You can also use Excel, Python, or many many other tools. Bootstrapped 95% CIs are **very** useful in modern experiment practice.
- Include example images of each visualization as they appeared in your experiment (i.e. if you used a pie chart show the actual pie chart you used in the experiment along with the markings, not an example from Google Images).

## General Requirements

0. Your code should be forked from the GitHub repo and linked using GitHub pages.
2. Your project should use d3 to build visualizations. 
3. Your writeup (readme.md in the repo) should contain the following:

- Working link to the experiment hosted on gh-pages or some other site.
- Concise description and screenshot of your experiment.
- Description of the technical achievements you attempted with this project.
- Description of the design achievements you attempted with this project.

Background
---

GitHub Details
---

- Fork the GitHub Repository. You now have a copy associated with your username.
- Make changes to index.html to fulfill the project requirements. 
- Make sure your "master" branch matches your "gh-pages" branch. See the GitHub Guides referenced above if you need help.
- Edit this README.md with a link to your gh-pages site: e.g. http://YourUsernameGoesHere.github.io/Experiment/index.html
- Replace this file (README.md) with your writeup and Design/Technical achievements.
- To submit, make a [Pull Request](https://help.github.com/articles/using-pull-requests/) on the original repository.
- Name your submission using the following scheme: 
```
a3-FirstLastnameMember1-FirstLastnameMember2-FirstLastnameMember3-...

2/2/24 Experiment Plan:

Preliminaries:

WE NEED 10 PARTICIPANTS OF VARIED BACKGROUNDS AND 20 TRIALS PER VISUALIZATION TYPE, PER PARTICIPANT (60 TRIALS PER PARTICIPANT).
We are going to use icon charts for our data visualizations in our experiments.
Do not use JUST university students for our experiment.
Look at Chartwells employees in the CC.
Consider talk-analysis, but know this is laborius.
Consider talking to Price Chopper employees.
Consider talking to family outside of WPI.

Application and Experiment Ideas:

I think for the sake of time we should implement an experiment that has a similar structure to Cleveland-McGill and asks a similar question.
I read through the medical/hospital visualization papers; I couldn't piece together a clear idea for an experiment we could do based on those experiments specifically.
A good goal for us can be to have the web application built by Friday 2/9 (which should be doable), and then conduct the necessary experiments the following week and write up the README with the master csv file attached.

Application:
    - Use basic Javascript/HTML/CSS frameworks to build the frontend (we only need 3 different visualizations for this experiment, so the application navigation is relatively short-lived). React should be a good fit for the project.
    - We can use Bulma CSS to style the applicaton; very quick and easy to implement.
    - Have a user registration/login that will allow us to keep track of experiment results for the current user. The master csv file we update periodically throughout the second week can reflect each username and the corresponding experiment results.
    - Use Firebase for a relatively easy persistent database instead of having a server.

Experiment:
    - Key question we can ask the user: "How many times larger is the larger than the smaller?" (variant of the Cleveland-McGill question).
    - 3 Visualization types:
        - Horizontal Bar chart
        - Pie Chart
        - Horizontal Stacked Bar Chart

    - We could visualize data (loosely without tick marks that are too revealing) about COVID-19 as suggested in the README. Musical cateogrical data is another idea!


```
