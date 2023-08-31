
# Tests Netlify - Form to collect votes
```bash
terminal> netlify dev
```

Meanwhile, the form is available at http://127.0.0.1:8081/vote.html
![](https://i.imgur.com/evoTR1g.png)


# Tests Javascript - Browser code to display radar
see log in Chrome > F12

## Radar (static)
```bash
terminal> cd server
terminal> web
browser> http://127.0.0.1:8081/tests/radar/index.html
```

## Radar (dynamic from Github)
```bash
terminal> cd server
terminal> web
browser> http://127.0.0.1:8081/tests/getjson/index.html
```

### A few details about design
front_end_env.js
```javascript
			let GH_RAW_URL = "https://raw.githubusercontent.com" ;
			let REPOSITORY_OWNER = "prodageo" ;
			let REPOSITORY_NAME = "verycoll" ;
			let BRANCH_NAME = "main" ;
```

Will collect files in _data/votes starting with digestp1, 1 (
```
verycoll/_data/votes
/digestp1_1_3b4acfbea83cb9f83f53e0601aa6b2ed7cc177c9.json
```

radarChart.js
```javascript
async function RadarChartApp() {
	const getjson = new getJson();
	
	const obj = await getjson.treatRadarData( 'digestp1', '1' ) ;
```

See also http://127.0.0.1:8081/tests/login

![](https://i.imgur.com/TSajvLb.png)

# Deploy
```bash
terminal> netlify deploy
```

# Resources
- https://docs.netlify.com/cli/get-started/