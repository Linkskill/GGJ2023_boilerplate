import * as THREE from 'three';
import BackgroundMusic from '../../components/soundLoaders/backgroundMusic';

const Cube = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const object = new THREE.Mesh( geometry, material );
    scene.add( object );
    
    camera.position.z = 5;
    
    const animate = () => {
        requestAnimationFrame( animate );
    
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
    
        renderer.render( scene, camera );
    }

    animate();

    return(
        <div>
            <BackgroundMusic camera={camera} />
        </div>
    );
}

export default Cube;
