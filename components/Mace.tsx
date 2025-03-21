// Enhanced Mace component that takes a variant number and className
interface MaceIconProps {
  variant?: number;
  className?: string;
  ariaHidden?: boolean;
}

const MaceIcon = ({ variant = 0, className = "", ariaHidden = false }: MaceIconProps) => (
    <svg 
      viewBox="-4 0 164 93.27077377840632" 
      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${className}`}
      style={{ transform: `rotate(${variant * 45}deg)`, }}
      aria-hidden={ariaHidden || "true"}
      role="img"
      aria-label="Mace icon"
      data-variant={variant}
      data-testid="mace-icon"
    >
      <path
        d="M78.914,44.259l2.456-2.456l0-4.176l5.072-3.064l-5.071-3.062l0-3.267l-0.019-0.329l-2.443-2.443l1.434-5.807l-5.807,1.434 l-2.461-2.461h-3.578l-3.064-5.072l-3.063,5.072l-4.175,0l-2.456,2.456l-5.808-1.434l1.434,5.807l-2.449,2.449v3.749l-5.085,3.071 l5.085,3.071l0,3.392L13.559,80.964l0,4.704l0.004,0.768h0.014v0.01l5.455-0.009l39.775-35.356H62.2l3.071,5.084l3.071-5.085 l3.749,0l2.449-2.449l5.806,1.433L78.914,44.259z"
        fill="currentColor"
      />
    </svg>
  );

export default MaceIcon;