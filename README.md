# Markdown Docs
_The same readme, built with this: [here](https://ldeluigi.github.io/markdown-docs/)!_  

This repository contains the definition of a Docker image that can be used both as a **[builder](#as-docker-builder)** stage and as an **[action](#as-github-action)**.

**markdown-docs** is implemented as a jam of stuff you don't even need to know about. Just assume that everything is supported until you find that it's not, then submit an issue to add support for even that thing. Only if you really need it.

## Supported Markdown extensions:
- The default, standard, Markdown syntax, described at [this website](https://daringfireball.net/projects/markdown/syntax), with [these differences](https://python-markdown.github.io/#differences).
- **markdown_include**: Command that embeds a markdown file into another. Headers will be shifted to subheaders relative to enclosing header. See the [readme](https://github.com/cmacmackin/markdown-include/).
- **plantuml_markdown**: See the official [readme](https://github.com/mikitex70/plantuml-markdown#readme). Supports non-UML tags like `@startjson` or math equations too.
- **arithmatex**: See the [docs](https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/). Provides mathematical style and fonts for expressions.
- **admonition** and **details**: See the [admonitions docs](https://squidfunk.github.io/mkdocs-material/reference/admonitions/) and [details docs](https://facelessuser.github.io/pymdown-extensions/extensions/details/). Provides highlighted text cells for many purposes. Details are also called [collapsible blocks](https://squidfunk.github.io/mkdocs-material/reference/admonitions/#collapsible-blocks).
- **keys**: You can embed keyboard symbols in text. See the [docs](https://facelessuser.github.io/pymdown-extensions/extensions/keys/).
- **tabs**: Enables content tabs. See the [docs](https://squidfunk.github.io/mkdocs-material/reference/content-tabs/).
- **tasklist**: Enables GitHub style tasks list. See the [docs](https://facelessuser.github.io/pymdown-extensions/extensions/tasklist/).
- **abbreviations**: Enables explanations for abbrevations. See the [docs](https://python-markdown.github.io/extensions/abbreviations/).
- **footnotes**: Enables footnotes. See the [docs](https://python-markdown.github.io/extensions/footnotes/).
- **git-revision-date-localized**: Enables linking last edit date of the page. See the [docs](https://timvink.github.io/mkdocs-git-revision-date-localized-plugin/index.html).
- **git-authors-plugin**: Enables linking git authors of the page. See the [docs](https://timvink.github.io/mkdocs-git-authors-plugin/index.html).
- **literate-nav**: Allows to customize navigation menus for each folder. The navigation menu must be specified inside a `SUMMARY.md` file. For more information see the [docs](https://oprypin.github.io/mkdocs-literate-nav/#usage).

## Usage
You can use **markdown-docs** both as a [GitHub Acton](#as-github-action) or a [Docker builder stage](#as-docker-builder) inside your dockerfile.

### As GitHub Action
To use **markdown-docs** as a GitHub Action, use the following syntax in your workflow:
```yaml
      - name: Generate HTML from Markdown
        uses: ldeluigi/markdown-docs@latest
        with:
          src: doc
          dst: generated
```
This means that every markdown file inside the `doc` folder in the current workspace will be converted and mapped to a corresponding HTML file inside the `generated` directory. You can pass `.` as src to search the entire repo for markdown files. `dst` folder will be emptied before generation.

#### Additional information
In order to make the "last edit date" plugin work you need to clone the full history of your documentation inside your CI. With GitHub actions this can be done using the option `fetch-depth: 0` with the `actions/checkout@v2` step.

#### Complete usage example with all the parameters
```yaml
      - name: Generate HTML from Markdown
        uses: ldeluigi/markdown-docs@latest
        with:
          src: doc
          dst: generated
          language: en
          icon: library
          primary-color: indigo
          secondary-color: indigo
```
##### Additional parameters info
* `language` is an optional paramater (defaults to `en`) that allows to change [language features](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language) and [search features](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/#built-in-search).
* `icon` is an optional parameter (defaults to `library`) that selects the main top-left icon of the documentation website. Can be one of the icons from [Material Design Icons](https://materialdesignicons.com).
* `primary-color` is an optional parameter (defaults to `indigo`) that selects the main color of the documentation website. For more information, see the [docs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#primary-color).
* `secondary-color` is an optional parameter (defaults to `indigo`) that selects the accent color of the documentation website. For more information, see the [docs](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#accent-color).

### As Docker builder
To use **markdown-docs** as a Docker builder stage use the following syntax in your Dockerfile:  
```dockerfile
FROM deloo/markdown-docs AS builder

COPY docs/ /home/src
ENV WORKSPACE=/home
RUN makedocs "src" "dst"

FROM ...

COPY --from=builder /home/dst /var/www/static/
```
This means that first docker stage creates a container where it runs the makedocs script, then will copy the resulting, generated HTML files in the production image, specifically in `/var/www/static`. This can be useful for your static website hosting. See [the Wiki](https://github.com/ldeluigi/markdown-docs/wiki) for more examples.

#### Environment variables
There are some environment variables that control the behaviour of the builder. These are:
```dockerfile
ENV WORKSPACE=/home
# Optionals (with their default values)
ENV LANGUAGE=en
ENV ICON=library
ENV PRIMARY_COLOR=indigo
ENV SECONDARY_COLOR=indigo
```
* `WORKSPACE` selects the path in which the main script is run. This path should be the root of your working directory, inside which there are both the source folder and the destination folder.
* `LANGUAGE`, `ICON`, `PRIMARY_COLOR`, `SECONDARY_COLOR` are all described in [this section](#additional-parameters-info).


## Notes about documenting your software
The idea behind **markdown-docs** is that all the documentation that can be written in separate files from the code should be mantained like the code documentation, that is thinking about the content and not the appearence. In addition, some of the most important tools for documentation are UML diagrams. In particular, one of the most maintainable way to draw UMLs is [PlantUML](https://plantuml.com/), which can generate UML diagrams for a text specification.  
One of the most important features of **markdown-docs** is the support of PlantUML syntax embedded inside documentation sources, in Markdown.[language features](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language) and [search features](https://squidfunk.github.io/mkdocs-material/setup/setting-up-site-search/#built-in-search)


## Contributing
Fork this project and make PRs.
### Local tests
With **Docker** *(suggested)*:
```bash
docker build -t markdown-docs . --no-cache
docker run -e WORKSPACE=/github/workspace -v <YOUR-CURRENT-WORKING-DIRECTORY>:/github/workspace markdown-docs . result/
```
