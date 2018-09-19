 const { injectBabelPlugin } = require('react-app-rewired');
 const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
	config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
	//config =  rewireLess (config, env);
	config = rewireLess.withLoaderOptions({
		modifyVars: { "@primary-color": "Blue" },
	})(config, env);
	return config;
};