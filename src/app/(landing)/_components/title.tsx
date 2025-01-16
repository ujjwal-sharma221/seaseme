import VerticalCutReveal from "@/components/fancy/vertical-cut-reveal";

export function Title() {
  return (
    <div className="w-full h-full xs:text-2xl text-6xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl flex flex-col items-start justify-center  bg-background p-10 md:p-16 lg:p-24 text-[#0015ff] tracking-wide uppercase">
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="first"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
        }}
      >
        {`HI 👋, FRIEND!`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="last"
        reverse={true}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 0.5,
        }}
      >
        {`WELCOME TO`}
      </VerticalCutReveal>
      <VerticalCutReveal
        splitBy="characters"
        staggerDuration={0.025}
        staggerFrom="center"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 21,
          delay: 1.1,
        }}
      >
        {`SEASEME`}
      </VerticalCutReveal>
    </div>
  );
}
