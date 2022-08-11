const mtnColors = [
    ['hsla(345, 61%, 34%, .2)','hsla(345, 61%, 65%, .1)'],
    ['hsla(345, 61%, 29%, .2)','hsla(345, 64%, 35%, .2)'],
    ['hsla(345, 64%, 20%, .2)','hsla(345, 68%, 26%, .2)'],
    ['hsla(345, 66%, 12%, .3)','hsla(345, 70%, 17%, .3)'],
    ['hsla(345, 71%, 7%, .3)','hsla(345, 75%, 10%, .4)'],
    ['hsla(343, 76%, 1%, .4)','hsla(345, 80%, 4%, .4)']
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
    let hmod = 0.6;

    for (var i = 0; i < 6; i++) {
        createMtn(i);
        (i<5) && createFog(i);
        hmod += 0.05;
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
        return py + (Math.floor(Math.random() * 16) + -8); 
    }
    function cragX(px) {
        return px + (Math.floor(Math.random() * 5) + 1); 
    }
}