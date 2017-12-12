 import {THREE} from '../assets/AnaglyphEffect'
 import Detector from '../assets/Detector'

let Background = function(bgDiv) {
	init(bgDiv);
	animate();
}

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container;
var camera, scene, renderer, effect;
var mesh, lightMesh, geometry;
var spheres = [];
var directionalLight, pointLight;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );



function init(bgDiv) {
	container = document.createElement( 'div' );
	bgDiv.appendChild( container );
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
	camera.position.z = 3;
	camera.focalLength = 3;
/*
	var path = "/imgs/";
	var format = '.png';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];*/

	var urls = [
		require('./imgs/px.png'), require('./imgs/nx.png'),
		require('./imgs/py.png'), require('./imgs/ny.png'),
		require('./imgs/pz.png'), require('./imgs/nz.png')
	];


	var textureCube = new THREE.CubeTextureLoader().load( urls );
	scene = new THREE.Scene();
	scene.background = textureCube;
	var geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
	for ( var i = 0; i < 500; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.x = Math.random() * 10 - 5;
		mesh.position.y = Math.random() * 10 - 5;
		mesh.position.z = Math.random() * 10 - 5;
		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
		scene.add( mesh );
		spheres.push( mesh );
	}
	//
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	var width = window.innerWidth || 2;
	var height = window.innerHeight || 2;
	effect = new THREE.AnaglyphEffect( renderer );
	effect.setSize( width, height );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	effect.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
	mouseX = ( event.clientX - windowHalfX ) / 100;
	mouseY = ( event.clientY - windowHalfY ) / 100;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	var timer = 0.0001 * Date.now();
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	for ( var i = 0, il = spheres.length; i < il; i ++ ) {
		var sphere = spheres[ i ];
		sphere.position.x = 5 * Math.cos( timer + i );
		sphere.position.y = 5 * Math.sin( timer + i * 1.1 );
	}
	effect.render( scene, camera );
}

export {Background}