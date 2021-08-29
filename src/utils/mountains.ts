
//const amount = 6;
const mtnColors = [
    ['#c2c2c2','#e3e3e3'],
    ['#919191','#b3b3b3'],
    ['#757575','#969696'],
    ['#4a4a4a','#6b6b6b'],
    ['#333333','#3f3f3f'],
    ['#1C161C','#1C1915']

];
const fogColors = [
    ['rgba(255, 255, 255, 0.1)','rgba(255, 255, 255, 0.2)'],
    ['rgba(181, 195, 201, 0.1)','rgba(245, 250, 255, 0.1)'],
    ['rgba(180, 196, 202, 0.1)','rgba(235, 245, 245, 0.1)'],
    ['rgba(177, 198, 205, 0.05)','rgba(230, 240, 240, 0.05)'],
    ['rgba(168, 201, 215, 0.05)','rgba(255, 255, 255, 0.05)']
]

export const mountains = (ctx,w,h) => {
    
    ctx.lineWidth = 0;
    let hmod = 0.4;

    for (var i = 0; i < 6; i++) {
        createMtn(i);
        (i<5) && createFog(i);
        hmod += 0.1;
    }

    function createFog(i) {
        let lingrad = ctx.createLinearGradient(w,(h*hmod),w,h);
        lingrad.addColorStop(0, fogColors[i][0]);
        lingrad.addColorStop(1, fogColors[i][1]);
        ctx.fillStyle=lingrad;
        var x = 0;
        var y =  h*(hmod+0.12);
        ctx.moveTo(0,y);
        while (x < w) {
            let prevX = x;
            x = cragX(x);
            y = cragY(y);
            ctx.arc(x,y,x-prevX,0,Math.PI,true);
        }
        endPath(ctx,w,h);
    }

    function createMtn(i) {
        let lingrad = ctx.createLinearGradient(0,h*(hmod+(0.09)),0,h);
        lingrad.addColorStop(0, mtnColors[i][0]);
        lingrad.addColorStop(1, mtnColors[i][1]);
        ctx.fillStyle=lingrad;
        let x = 0;
        let y = h*hmod;
        ctx.moveTo(0,y);

        while (x < w) {
            x = cragX(x);
            y = cragY(y);
            ctx.lineTo(x,y);
        }
        endPath(ctx,w,h);
    }

    function endPath(ctx,w,h) {
        ctx.lineTo(w,h);
        ctx.lineTo(0,h);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
    }

    function cragY(py) {
        return py + (Math.floor(Math.random() * 20) + -10); 
    }
    function cragX(px) {
        return px + (Math.floor(Math.random() * 6) + 1); 
    }
}