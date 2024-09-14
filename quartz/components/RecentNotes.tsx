import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  linkToMore: SimpleSlug | false
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  linkToMore: false,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const recentNote = pages[0] // Get only the most recent note

    return (
      <div class={classNames(displayClass, "recent-notes")}>
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        {recentNote && (
          <ul class="recent-ul">
            <li class="recent-li">
              <div class="section">
                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, recentNote.slug!)} class="internal">
                      {recentNote.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title}
                    </a>
                  </h3>
                </div>
                {recentNote.dates && (
                  <p class="meta">
                    <Date date={getDate(cfg, recentNote)!} locale={cfg.locale} />
                  </p>
                )}
              </div>
            </li>
          </ul>
        )}
        {opts.linkToMore && pages.length > 1 && (
          <p>
            <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
              {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining: pages.length - 1 })}
            </a>
          </p>
        )}
      </div>
    )
  }
  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor