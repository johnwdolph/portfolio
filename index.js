import * as THREE from 'three';
    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const t = document.body.getBoundingClientRect().top;
camera.position.setZ(20 + t * -0.01);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(10, 16, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00AA88, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000AA, wireframe: true });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z-50);
  scene.add(star);
}
Array(30).fill().forEach(addStar);

function moveCamera() {
  //give dimensions of viewport, top shows how far from top of page
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = 20 + t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
  let rotation = true;
  if(rotation === true)
  {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.0005;
    mesh.rotation.y += 0.0002;
    mesh.rotation.z += 0.0005;
  }
  renderer.render(scene, camera);
}

animate();

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );

}

// Resize images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.resizableImage');

  // Function to enlarge the image
  function enlargeImage(event) {
    const image = event.target;
    image.classList.add('enlarged');
    
    // Calculate the position of the image relative to the viewport
    const imageRect = image.getBoundingClientRect();
    const imageTop = imageRect.top + window.scrollY;
    const imageBottom = imageRect.bottom + window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate the amount to scroll to center the image vertically
    const scrollAmount = (imageTop + imageBottom - viewportHeight) / 2;
    
    // Scroll the screen to center the image vertically
    window.scrollTo({
      top: scrollAmount,
      behavior: 'smooth' // Optional: add smooth scrolling effect
    });
    
    // Add event listener to shrink the image when clicked away
    document.addEventListener('click', function shrinkImageOnClickAway(event) {
      if (event.target !== image) {
        image.classList.remove('enlarged');
        document.removeEventListener('click', shrinkImageOnClickAway);
      }
    });
  }

  // Add event listener to each image to enlarge on click
  images.forEach(function(image) {
    image.addEventListener('click', enlargeImage);
  });
});

