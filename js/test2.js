// set the scene size
    var parent, renderer, scene, camera, controls, pointLight;
        
    //Call startup funcs
    init();   
        
    function init() {  
        
	var WIDTH = 200,
	    HEIGHT = 200;
        // set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;
	// get the DOM element to attach to
	var $container = $('#btn2');
	// Define all variables --------------------------------------------------------------
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(WIDTH, HEIGHT);
	// attach the render-supplied DOM element
	$container.append(renderer.domElement);
        
    //----------------------------------------------------------------
// scene
	scene = new THREE.Scene();
	
    }