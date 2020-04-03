# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Ludovic Delisle| 271995 |
| Sena Necla Cetin| 314092 |
| Kamil Seghrouchni| 273938|



[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### Related Work 

**What others have already done with the data?**

There has been a lot of data analysis and visualization done on Pokemon datasets. The work includes:
*   Interactive tables where the user can sort pokemon with respect to a specific stat. 
*   Distributions of stats and their correlation heatmaps.
*   Table showing average stats for each pokemon type.
*   Table showing number of available moves to be learned by each (combined) type.
*   Plot showing average speed, attack/defense, and special attack/special defense by pokemon type.
*   Attack vs. defense plot of individual pokemon.
*   Special attack vs. special defense of individual pokemon.
*   Interactive comparison of two pokemon based on individual or average stats.
*   Interactive effectiveness chart of pokemon types. 
*   Interactive stats-sorting with respect to an individual stat or average stats and showing the best and worst pokemon with respect to that stat. 
*   Interactive journey map showing the gym stats for each region.

References to the work mentioned above:
*   https://medium.com/dataregressed/data-visualization-with-tableau-pokémon-ec2a82242f8b 
*   https://medium.com/dataregressed/statistical-analysis-with-python-pokémon-1a72dd0451e1
* https://towardsdatascience.com/exploratory-analysis-of-pokemons-using-r-8600229346fb
* https://public.tableau.com/profile/alessandro.costanzo#!/vizhome/PokmonAGuideforBeginners_/PokmonGuide 


**Why is your approach original?**

Our approach is original because we combine various stats available in datasets to create a holistic guide to Pokemon. We combined basic stats (e.g. speed, hp, attack), with effectiveness data (i.e. against_fire, against_bug), along with body type and egg statistics, and combats data, where we can extract which pokemon wins over which. Our visualization plan consists of 4 main parts:

1.   Statistics of variables per generation: To the best of our knowledge, previous work on this dataset does not analyze pokemon grouped by their generation. With this part, we aim to visualize the changes in stats of pokemon over generations with an interactive interface where they will be able to observe the change in stats over generations by dragging a slider.

2.   Individual pokemon stats per generation: We will visualize pokemon in a circular interactive chart, colored and grouped by their type across generations, over which the user can hover to see the spider chart visualizing each pokemon's stats. The user will be able to get an overview of the type distribution of each generation while also getting information about the stats of the individual pokemon they are interested in. Even though previous work has been done on the stats of pokemon, our approach is original such that we will provide general and specific information in a single visualization.

3.   Bipartite graph of stats: We will let the user choose the variable that they want the see the effect of on other variables. Through this graph, the user will interactively get insights about the effect of each stat over the others.

4.   "Cook" your own pokemon: This part will introduce the concept of suggesting the user their ideal pokemon from the criteria that they specify. To the best of our knowledge, there has been no visualization work done on body type of pokemon. So, we decided to utilize this gap in previous work and create a recommendation system, where we recommend the user the best pokemon with their specified criteria. Even though the user may be able to find the pokemon with the best stats through a simple research, the results do not consider the user's taste in pokemon, such as their preffered color, body type, and type. This visualization will take into consideration the users' individual tastes.


**What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).**

We were inspired by the comic book visualization done in this course in the previous years. The idea of providing insight on a fun topic striked our attention. We were inspired by their bipartite chart, visualizing the effect of a certain attribute on the others. We have also been inspired by their circle chart, color-coding the superheroes by their categories and showing the stats of an individual hero when the user hovers over it. However, our work will be different such that it will include spider charts in the visualization of specific pokemon.

Reference: https://exploringcomics.github.io/src/app/index.html 

**In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.**

This does not apply to our project.


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

