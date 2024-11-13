import Image from "next/image";
import Link from "next/link";

const SubmitEventSection = () => {
    const image = "/images/bleach.jpg";
  
    return (
      <section className="isolate overflow-hidden px-6 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
          <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
            <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
              <h3 className="text-6xl text-galactic-text font-[Special-Elite] pb-10">
                Submit An Event
              </h3>
              <blockquote className="text-xl font-semibold leading-8 text-galactic-text sm:text-2xl sm:leading-9">
                <p>
                  Commodo amet fugiat excepteur sunt qui ea elit cupidatat ullamco
                  consectetur ipsum elit consequat. Elit sunt proident ea nulla ad
                  nulla dolore ad pariatur tempor non. Sint veniam minim et ea.
                </p>
              </blockquote>
            </div>
            <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
              <Image
                alt="call to action photo"
                src={image}
                width={400}
                height={400}
                className="rounded-xl w-full bg-indigo-50 lg:rounded-3xl"
              />
            </div>
            <figcaption className="text-base text-galactic-text lg:col-start-1 lg:row-start-3">
              <Link href="/events/submitOrganizerForm">Submit an Event</Link>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  };
  

  export default SubmitEventSection