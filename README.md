# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Ludovic Delisle| 271995 |
| Sena Necla Cetin| 314092 |
| Kamil Seghrouchni| 273938|

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### Dataset

### Problematic

### Exploratory Data Analysis

We present here a summary of our findings from our exploratory data analysis. Please refer to Milestone1.ipynb for complete findings and plots.

For the ease of collaborative work, we have separated our dataset into three logical groups. 

Put first group attributes and findings here

The second group of explored attributes are:
*	hp: The Base Health Points of the Pokemon
*	attack: The Base Attack of the Pokemon
*	defense: The Base Defense of the Pokemon
*	sp_attack: The Base Special Attack of the Pokemon
*	sp_defense: The Base Special Defense of the Pokemon
*	speed: The Base Speed of the Pokemon
*	is_legendary: Denotes if the Pokemon is legendary
*	base_total. Sum of all the base stats (Health Points, Attack, Defense, Special Attack, Special Defense, and Speed)
*	against_?: Eighteen features that denote the amount of damage taken against an attack of a particular type

From the distributions of our continuous variables, such as hp, speed, (special) attack, and (special) defense, we observed a slight right-skew for all of them, meaning the median values are lower than the mean values for all of these attributes.

We then checked the correlation heatmap for our features. We found that there is a moderate positive correlation between total base stats of a pokemon and it being a legendary pokemon. This finding makes sense since legendary pokemon have overall better stats. Moreover, out of all the features, special attack and special defense features stand out in legendary pokemon. They have the highest correlation (0.4) out of any stats apart from base_total.

We found a moderate positive correlation between defense and attack, as well as between sp_defense, sp_attack, and defense. In addition, we found that a higher hp usually means higher attack, sp_attack, and sp_defense. This makes sense because pokemon get higher hp as they evolve and advance. With that, their hp increases along with their other stats.

We plotted the median evolution of each of these stats throughout generations to observe any potential trend and have in fact observed a peak at generation 4 for each of these stats, meaning generation 4 pokemon have the best stats compared to the first 6 generations.

We proceeded our analysis with the is_legendary feature. We found that the number of legendary pokemon is the highest in generations 4 and 5, while its percentage being the highest in generation 4. On the other hand, generation 1 contains the lowest number and percentage of legendary pokemon. When we plotted the legendary and non-legendary features separately on the same histogram, we observed a significant margin in the features of legendary pokemon. To go even further in our legendary pokemon analysis, we plotted separate heatmaps for legendary and non-legendary pokemon.

### Related Work 

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
*  https://towardsdatascience.com/exploratory-analysis-of-pokemons-using-r-8600229346fb
*  https://public.tableau.com/profile/alessandro.costanzo#!/vizhome/PokmonAGuideforBeginners_/PokmonGuide 

Our approach is original because we combine various stats available in datasets to create a holistic guide to Pokemon. We combined basic stats (e.g. speed, hp, attack), with effectiveness data (i.e. against_fire, against_bug), along with body type and egg statistics, and combats data, where we can extract which pokemon wins over which. Our visualization plan consists of 4 main parts:

1.   Statistics of variables per generation: To the best of our knowledge, previous work on this dataset does not analyze pokemon grouped by their generation. With this part, we aim to visualize the changes in stats of pokemon over generations with an interactive interface where they will be able to observe the change in stats over generations by dragging a slider.

2.   Individual pokemon stats per generation: We will visualize pokemon in a circular interactive chart, colored and grouped by their type across generations, over which the user can hover to see the spider chart visualizing each pokemon's stats. The user will be able to get an overview of the type distribution of each generation while also getting information about the stats of the individual pokemon they are interested in. Even though previous work has been done on the stats of pokemon, our approach is original such that we will provide general and specific information in a single visualization.

3.   Bipartite graph of stats: We will let the user choose the variable that they want the see the effect of on other variables. Through this graph, the user will interactively get insights about the effect of each stat over the others.

4.   "Cook" your own pokemon: This part will introduce the concept of suggesting the user their ideal pokemon from the criteria that they specify. To the best of our knowledge, there has been no visualization work done on body type of pokemon. So, we decided to utilize this gap in previous work and create a recommendation system, where we recommend the user the best pokemon with their specified criteria. Even though the user may be able to find the pokemon with the best stats through simple web search, the results do not consider the user's taste in pokemon, such as their preferred color, body type, and type. This visualization will take into consideration the users' individual tastes.

We were inspired by the comic book visualization done in this course in the previous years. The idea of providing insight on a fun topic striked our attention. We were inspired by their bipartite chart, visualizing the effect of a certain attribute on the others. We have also been inspired by their circle chart, color-coding the superheroes by their categories and showing the stats of an individual hero when the user hovers over it. However, our work will be different such that it will include spider charts in the visualization of specific pokemon.

Reference: https://exploringcomics.github.io/src/app/index.html 

We have not explored this topic and dataset in another context.


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

