const Button = ({ label, onClick, disabled, outline, small, icon: Icon, type = "button", value }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      value={value}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-80
          transition
          cursor-pointer
          px-4
          w-full
          ${outline ? 'bg-white' : 'bg-amber-200'}
          ${outline ? 'border-black' : 'border-lime-500'}
          ${outline ? 'text-black' : 'text-black'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-1' : 'py-2'}
          ${small ? 'font-light' : 'font-semibold'}
          ${small ? 'border' : 'border-2'}
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {label}
    </button>
  )
}

export default Button
