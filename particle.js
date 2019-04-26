const thresh=20**2;
const k=120;
const ranF=1.3;
const windF=0.3;
const windDir=[0.70,-0.70];
class Particle
{
    constructor(x,y,w,h,col)
    {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.col=col;
        this.v=[0,0];
        this.a=[0,0];
    }
    applyCouloumbicForce(d,uV)
    {
        let mag;
        if(d<5)
            mag=15;
        else
            mag=k/(d**2);
        this.a[0]=uV[0]*mag;
        this.a[1]=uV[1]*mag;
    }
    applyrandomForce()
    {
        this.a[0]+=ranF*Math.random()*2-ranF;
        this.a[1]+=ranF*Math.random()*2-ranF;
    }
    applyWindForce()
    {
        this.a[0]+=windF*windDir[0];
        this.a[1]+=windF*windDir[1];
    }
    update()
    {
        if(hasSnapped)
        {
            let distS=distanceS(this.x,this.y,mX,mY);
            //if(distS<=thresh)
            {
                let uVec=[this.x-mX,this.y-mY];
                let dist=Math.sqrt(distS);
                uVec[0]/=dist;
                uVec[1]/=dist;
                this.applyCouloumbicForce(dist,uVec);
                this.applyrandomForce();
                this.applyWindForce();
            }

            this.x+=this.v[0];
            this.y+=this.v[1];

            this.v[0]+=this.a[0];
            this.v[1]+=this.a[1];

            this.a[0]=0;
            this.a[1]=0;
    }
    }
    draw()
    {
        fill(this.col[0],this.col[1],this.col[2]);
        rect(this.x,this.y,this.w,this.h);
    }    
}
