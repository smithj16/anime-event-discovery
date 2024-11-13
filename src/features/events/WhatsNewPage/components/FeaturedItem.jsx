//FeatureItem 
import Image from "next/image";
import dateFormatter from "@/hooks/dateFormatter";

const FeaturedItem = ({ images, date, name, description, style }) => {
    const formattedDate = dateFormatter(date, "format3");
  
    return (
      <div className={style?.container} style={style}>
        <Image
          src={images?.logo}
          width={400}
          height={400}
          className="mb-3 h-[200px] w-full rounded-lg object-cover"
          alt={`An image for a fake blog post titled ${name}`}
        />
        <span className="mb-2 rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase ">
          {formattedDate}
        </span>
        <h4 className="my-1.5 text-lg font-medium">{name}</h4>
        <p className="text-sm">{description}</p>
      </div>
    );
  };

  export default FeaturedItem