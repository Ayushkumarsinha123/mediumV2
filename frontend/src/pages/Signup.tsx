import { AuthPart } from "../components/AuthPart"
import { Quote } from "../components/Quote"

export const Signup = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
      <AuthPart/>
      </div>
      <div>
    <Quote/>
    </div>
    </div>
  )
}