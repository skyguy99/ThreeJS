// set the scene size
    var superparent, parent, renderer, scene, camera, controls, pointLight;
        
    //Call startup funcs
    init();
    animate();    
        
    function init() {  
        
	var WIDTH = window.innerWidth;
	    HEIGHT = window.innerHeight;
        // set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;
	// get the DOM element to attach to
	var $container = $('.wrapper2');
	// Define all variables --------------------------------------------------------------
	renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize(WIDTH, HEIGHT);
	// attach the render-supplied DOM element
	$container.append(renderer.domElement);
        
    //----------------------------------------------------------------
// scene
	scene = new THREE.Scene();
	
	// camera
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set( 12, -150, 30 );
	// controls
	controls = new THREE.OrbitControls( camera, renderer.domElement); //This is crucial for forms working
    controls.minDistance = 0;
    controls.maxDistance = 50;
        
        controls.update();
	
	// geometry
	var sun = new THREE.IcosahedronGeometry(18,2);
        
    var planet2 = new THREE.IcosahedronGeometry(8,1);
    var moon2 = new THREE.IcosahedronGeometry(1.5, 0);
    var ring = new THREE.TorusGeometry(14.5, 0.1, 5, 112, 6.3);
        
	// material
	var material1 = new THREE.MeshLambertMaterial(
	{
	    color: 0x8C8C8C
	});
    var material2 = new THREE.MeshLambertMaterial(
	{
	    color: 0x8C8C8C,
        emissive: 0xffffff
	});
    //var material3 = new THREE.MeshNormalMaterial();
    var defaultMaterial = new THREE.MeshPhongMaterial({ color: 0x24362E, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
    var ringMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
     var defaultMaterial2 = new THREE.MeshPhongMaterial({ color: 0x90D9FF, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
        
	
	// parent
    superparent = new THREE.Object3D();   
    scene.add(superparent);
        
	parent = new THREE.Object3D();
    parent.rotation.z = 5* Math.PI / 3;  
        
	superparent.add( parent );
	// pivots
	var pivot1 = new THREE.Object3D();
	var pivot2 = new THREE.Object3D();
	//var pivot3 = new THREE.Object3D();
        
	pivot1.rotation.z = 0;
	//pivot2.rotation.z = 2 * Math.PI / 3;
    pivot2.rotation.z = 5* Math.PI / 3;
	
	parent.add( pivot1 );
	parent.add( pivot2 );
	//parent.add( pivot3 );
	// mesh
	var mesh1 = new THREE.Mesh( planet2, defaultMaterial );
	var mesh2 = new THREE.Mesh( moon2, defaultMaterial );
    var mesh3 = new THREE.Mesh(ring, material2);  
    
        
       
	mesh1.position.y = 0;
	mesh2.position.y = 14; //dist from center
    mesh3.position.y = 0;    
        
	pivot1.add( mesh1 );
	pivot2.add( mesh2 );
    scene.add(mesh3);
    
    //stars
    scene.add(new createParticleSystem());
        
    pointLight = new THREE.PointLight( 0xFFFFFF );
	// set its position
	pointLight.position.x = 100;
	pointLight.position.y = -5;
	pointLight.position.z = 100;
	// add to the scene
	scene.add(pointLight);
	
}
function createParticleSystem() {
     
    // The number of particles in a particle system is not easily changed.
    var particleCount = 2000;
     
    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.IcosahedronGeometry(1, 0);
 
    // Create the vertices and add them to the particles geometry
    for (var p = 0; p < particleCount; p++) {
     
        // This will create all the vertices in a range of -200 to 200 in all directions
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;
               
        // Create the vertex
        var particle = new THREE.Vector3(x, y, z);
         
        // Add the vertex to the geometry
        particles.vertices.push(particle);
    }
 
    // Create the material that will be used to render each vertex of the geometry
    var particleMaterial = new THREE.PointsMaterial(
            {color: 0xffffff, 
             size: 4,
             shading: THREE.FlatShading,
             blending: THREE.AdditiveBlending,
             transparent: true,
            });
    
    var partMaterial2 = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
      
    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
 
    return particleSystem;  
}
function animate() {
	requestAnimationFrame( animate );
	parent.rotation.z += 0.03; //speed of rotation
    
	controls.update();
	renderer.render( scene, camera );
}