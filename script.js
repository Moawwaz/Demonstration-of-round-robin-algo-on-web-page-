// Variable Initialization
let i, n, time, remain, temps = 0, time_quantum;
let wt = 0, tat = 0;
console.log('Dekh Magar Pyar Sy 👀');

// Setting Number of Processes
n = 4;
remain = n;

// Arrays for Process Attributes
let at = [0,1,2,3];  
let bt = [8,4,6,2];  
let rt = [8,4,6,2];  

time_quantum = 2;

console.log("\n\nProcess\t:  Turnaround Time:  Waiting Time\n\n");

// Round Robin Algorithm
for (time = 0, i = 0; remain !== 0;) {
    // Check if remaining time for the current process is less than or equal to the time quantum
    if (rt[i] <= time_quantum && rt[i] > 0) {
        time += rt[i];
        rt[i] = 0;
        temps = 1;
    } else if (rt[i] > 0) {
        rt[i] -= time_quantum;
        time += time_quantum;
    }

    // Check if the current process is completed
    if (rt[i] === 0 && temps === 1) {
        remain--;
        console.log("Process{" + (i + 1) + "}\t:\t" + (time - at[i]) + "\t:\t" + (time - at[i] - bt[i]));
        console.log("\n");

        // Update waiting time and turnaround time
        wt += time - at[i] - bt[i];
        tat += time - at[i];
        temps = 0;
    }

    // Update the index for the next iteration
    if (i === n - 1)
        i = 0;
    else if (at[i + 1] <= time)
        i++;
    else
        i = 0;
}

// Calculate and display Average Time
var awt=wt * 1.0 / n;
var atat=tat * 1.0 / n;
console.log("Average waiting time " + awt);
console.log("Average turnaround time " + atat);
console.log("");

// Click Event for Animation
const v = document.getElementById('run')
v.addEventListener("click", function () {
    // Animation Logic
    // Sequence of processes to be animated
    const sequence = ['A','B','A','C','B','D','A','C','B','D','A','C','B','A','C','A','C','A','C','A']

    // Function to animate circles
    function animateCircle(index) {
        // Current process in the sequence
        const currentCircle = sequence[index];
        const currentElement = document.getElementById(`circle${currentCircle}`);

        // Apply glow animation to the current circle
        currentElement.style.animation = `glow${currentCircle} 1s forwards`;

        // Set a timeout to clear the animation and move to the next circle
        if (index < sequence.length - 1) {
            setTimeout(() => {
                currentElement.style.animation = '';
                animateCircle(index + 1);
            }, 1000);

            // Change background and text color for specific indices
            if(index==9){ currentElement.style.background='white ';currentElement.style.color='black ' }
            if(index==12){ currentElement.style.background='white '; currentElement.style.color='black '}
            if(index==18){ currentElement.style.background='white '; currentElement.style.color='black '}
        }
        
        // When the animation sequence is complete, set final colors and trigger celebration
        if (index == sequence.length - 1) {
            currentElement.style.background='white '; currentElement.style.color='black '
            congratulations();
        }
    }

    // Function for confetti celebration
    function congratulations(){
        setTimeout(()=>{
            // Generate confetti pieces with random properties and colors
            for(i=0; i<100; i++) {
                var randomRotation = Math.floor(Math.random() * 360);
                var randomScale = Math.random() * 1;
                var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
                var randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
                var randomAnimationDelay = Math.floor(Math.random() * 15);
                var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
                var randomColor = colors[Math.floor(Math.random() * colors.length)];

                // Create confetti piece
                var confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.top=randomHeight + 'px';
                confetti.style.right=randomWidth + 'px';
                confetti.style.backgroundColor=randomColor;
                confetti.style.obacity=randomScale;
                confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
                confetti.style.animationDelay=randomAnimationDelay + 's';
                document.getElementById("confetti-wrapper").appendChild(confetti);
              }
        },1000)
    }

    // Start the circle animation sequence
    animateCircle(0);
});

// Function for Smooth Scrolling
function scrool(){
    window.scrollTo({
        top:document.body.scrollHeight,
        behavior:'smooth'
    });
}
