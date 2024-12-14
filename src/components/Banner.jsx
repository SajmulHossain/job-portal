import { motion } from "motion/react";
import img1 from "../assets/office-happy-team.jpg";
import img2 from "../assets/programming team celebrate.jpg";

const Banner = () => {
  return (
    <section className="my-6">
      <div className="bg-base-200 rounded-xl h-[600px] lg:h-96 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-32 lg:gap-0 lg:flex-row-reverse">
          <div className="flex-1 flex px-8">
            <motion.img
              animate={{ y: [-50, 50, -50] }}
              transition={{ duration: 10, repeat: Infinity }}
              src={img1}
              className="max-w-sm w-64 rounded-[50px] border-l-8 border-b-8 border-blue-700  rounded-bl-md shadow-2xl"
            />
            <motion.img
              animate={{ x: [-50, 50,-50], y:[70,0,70] }}
              transition={{ duration: 10, repeat: Infinity }}
              src={img2}
              className="max-w-sm w-64 rounded-[50px] border-l-8 border-b-8 border-blue-700  rounded-bl-md shadow-2xl"
            />
          </div>
          <div className="flex-1 px-8">
            <motion.h1
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-5xl font-bold w-fit"
            >
              <motion.span
                transition={{ duration: 5, repeat: Infinity }}
                animate={{ color: ["#44ff33", "#bbaaff", "#44ff33"] }}
              >
                Job Collection
              </motion.span>{" "}
              for you!
            </motion.h1>
            <p className="py-6">
              Best job solution that you searching. Apply to the job where you
              are more skillful.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
