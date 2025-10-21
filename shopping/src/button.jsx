
export const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{
      backgroundColor: "white",
      color: "black"
    }}>
      {children}
    </button>
  )
}