import React from 'react'
import bgImg from "../../assets/background.jpg";
import Food1 from "../../assets/rotate.png"
import Food2 from "../../assets/rotate2.png"
import Food3 from "../../assets/rotate3.png"

const ImageList = [
    {
        id:1,
        img :Food1,
    },
    {
        id:2,
        img :Food2,
    },

    {
        id:3,
        img :Food3,
    }

];

const bgImage = {
    backgroundImage:`url(${bgImg})`,
    backgroundPosition:"center",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    width:"100%",
    height:"100%"
}
const Hero = () => {

    const [imageId,setImageId] = React.useState(Food1)
  return (
    <>
        <div 
        className="min-h-[550px] sm:min-h-[600px] bg-gray-100 dark:bg-gray-950 dark-text-white duration-200 flex justify-center items-center" 
        style={bgImage}>
            <div className="container pb-8 sm:pb-0">
                <div className="grid gird-cols-1 sm:grid-cols-2">
                    <div
                      data-aos="zoom-out"
                      data-aos-duration="400"
                      data-aos-once="true" 
                    className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>
                            Welcome to the Good food
                        </h1>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat reprehenderit non doloribus magnam ullam saepe, incidunt odio blanditiis, veniam aliquam maiores, assumenda perspiciatis modi nostrum? Consequuntur accusamus consectetur error placeat.</p>
                        <div className="">
                            <button className='bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-105 duration-200'>Order Now</button>
                        </div>
                    </div>
                    <div className="order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative">
                        <div className="flex justify-center items-center h-[300px] sm:h-[450px] mx-auto spin">
                            <img 
                            src={imageId} 
                            className='w-[300px] sm:w-[450px] mx-auto spin' 
                            alt="" />
                        </div>
                        <div className="flex lg:flex-col lg:top-1/2 lg-translate-y-1/2 lg:py-2 justify-center gap-2 absolute bottom-[0px] lg:-right-6 bg-white/30 rounded-full">
                            {
                                ImageList.map((item) =>(
                                    <img key={item.id} src={item.img}
                                    className='max-w-[70px] h-[70px] object-contain inline-block hover:scale-105 duration-200'
                                    onClick={()=>{
                                        setImageId(
                                            item.id === 1 ? 
                                            Food1 : item.id ===
                                            2 ? Food2 : Food3
                                        );
                                    }}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>
  )
}
export default Hero