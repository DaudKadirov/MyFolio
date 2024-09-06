import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = [
      { text: "Telegram", url: "https://t.me/hevgcc" },
      { text: "Behance", url: "https://www.behance.net/Hevgcc?ysclid=m0nbwcazav350165930" }
    ]
    return (
      <footer class={`${displayClass ?? ""}`}>
        <ul>
          {links.map(({ text, url }) => (
            <li key={text}>
              <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor