
const Heading = ({heading, paragraph }) => {
  return (
    <div className="text-center w-full lg:w-1/2 mx-auto py-8">
      <h3 className="font-bold text-2xl lg:text-4xl">{heading}</h3>
      {paragraph && <p className="text-gray-600 italic">{paragraph}</p>}
    </div>
  );
};

export default Heading;