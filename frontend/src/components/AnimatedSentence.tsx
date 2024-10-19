const AnimatedSentence = ({ text }: any) => {
  return (
    <div className='flex justify-center'>
      {text.split('').map((letter: any, index: any) =>
        letter === ' ' ? (
          <span
            key={index}
            className='inline-block animate-slide-in'
            style={{
              animationDelay: `${index * 100}ms`, // Stagger the animation
            }}
          >
            &nbsp;
          </span>
        ) : (
          <span
            key={index}
            className='inline-block animate-slide-in'
            style={{
              animationDelay: `${index * 100}ms`, // Stagger the animation
            }}
          >
            {letter}
          </span>
        )
      )}
    </div>
  );
};

export default AnimatedSentence;
