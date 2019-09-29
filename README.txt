README: Notes on an HTML + CSS + CSS + JS example
Time-stamp: <2019-09-26 -13:46- >
cpsc 335-05
project 1 cella ant
GROUP: GTA
MEMBERS:
 Morgan heaslet-889570339
 Joseph Santiago-889842258
 Mohammad Mirwais-893508358
 Gonzalo Plascencia-893681932
------------------------------------------------------------

How to handle the ANT files to get results:

1. Main HTML file is ant, a web page.
2. Sibling folder (at same level as .html) is "draw-stuff" and "ant".
  (You can move this folder elsewhere if you change ant.html accordingly.)
3. Web page links to (loads) cssant/styles.css
4. Web page has some HTML markup for title, header and text.
5. After body, web page loads two script files one called "draw-stuff" another "ant" with fcns.
6. After that, another Script section defines another function.
7. And then runs some "loose" Javascript commands.

How to show (and run) the web page:
8. Drag and drop the html file onto a browser to see what it does.

(*) Key: use fcn key F12 to open a "javascript console" in your browser
and see what might be going wrong: errors and warnings.

Contents in zip:
	a. ant(html)
	b.antjs(js)
	c. cssant(css)
	d. draw-stuff(js)
	e. styles(css)
	f. readme(txt)[this text you are reading]
Sources:
	lots of help from online user @Fwienb
	https://codepen.io/FWeinb/pen/CJpjl
Features:
	a. drop down menu selection where you can choose from 1 step at a time up to 10,000
	b. if you are in 1 step at a time mode easy to see the ant and direction it is going with arrow
Problems: 
	unknown if any problems exist yet
	***project description says to make square grid of 41x41 we believed this to be an error/typo and made it 410x410 instead
complexity: 
	O(N) describes our algorithm whose performance will grow linearly and in direct proportion to the size of number of steps.




