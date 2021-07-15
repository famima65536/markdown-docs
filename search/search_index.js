const local_index = {"config":{"indexing":"full","lang":["en"],"min_search_length":3,"prebuild_index":false,"separator":"[\\s\\-]+"},"docs":[{"location":"index.html","text":"Markdown Docs The same readme, built with this: here ! This repository contains the definition of a Docker image that can be used both as a builder stage and as an action . markdown-docs is implemented as a jam of stuff you don't even need to know about. Just assume that everything is supported until you find that it's not, then submit an issue to add support for even that thing. Only if you really need it. Supported Markdown extensions: The default, standard, Markdown syntax, described at this website , with these differences . markdown_include : Command that embeds a markdown file into another. Headers will be shifted to subheaders relative to enclosing header. See the readme . plantuml_markdown : See the official readme . Supports non-UML tags like @startjson or math equations too. arithmatex : See the docs . Provides mathematical style and fonts for expressions. admonition and details : See the admonitions docs and details docs . Provides highlighted text cells for many purposes. Details are also called collapsible blocks . keys : You can embed keyboard symbols in text. See the docs . tabs : Enables content tabs. See the docs . tasklist : Enables GitHub style tasks list. See the docs . abbreviations : Enables explanations for abbrevations. See the docs . footnotes : Enables footnotes. See the docs . git-revision-date-localized : Enables linking last edit date of the page. See the docs . Usage You can use markdown-docs both as a GitHub Acton or a Docker builder stage inside your dockerfile. As GitHub Action To use markdown-docs as a GitHub Action, use the following syntax in your workflow: - name : Generate HTML from Markdown uses : ldeluigi/markdown-docs@master with : src : doc dst : generated This means that every markdown file inside the doc folder in the current workspace will be converted and mapped to a corresponding HTML file inside the generated directory. You can pass . as src to search the entire repo for markdown files. dst folder will be emptied before generation. In order to make the \"last edit date\" plugin work you need to clone the full history of your documentation inside your CI. With GitHub actions this can be done using the option fetch-depth: 0 with the actions/checkout@v2 step. As Docker builder To use markdown-docs as a Docker builder stage use the following syntax in your Dockerfile: FROM deloo/markdown-docs AS builder COPY docs/ /home/src ENV WORKSPACE = /home RUN makedocs \"src\" \"dst\" FROM ... COPY --from = builder /home/dst /var/www/static/ This means that first docker stage creates a container where it runs the makedocs script, then will copy the resulting, generated HTML files in the production image, specifically in /var/www/static . This can be useful for your static website hosting. See the Wiki for more examples. Notes about documenting your software The idea behind markdown-docs is that all the documentation that can be written in separate files from the code should be mantained like the code documentation, that is thinking about the content and not the appearence. In addition, some of the most important tools for documentation are UML diagrams. In particular, one of the most maintainable way to draw UMLs is PlantUML , which can generate UML diagrams for a text specification. One of the most important features of markdown-docs is the support of PlantUML syntax embedded inside documentation sources, in Markdown.","title":"Markdown Docs"},{"location":"index.html#markdown-docs","text":"The same readme, built with this: here ! This repository contains the definition of a Docker image that can be used both as a builder stage and as an action . markdown-docs is implemented as a jam of stuff you don't even need to know about. Just assume that everything is supported until you find that it's not, then submit an issue to add support for even that thing. Only if you really need it.","title":"Markdown Docs"},{"location":"index.html#supported-markdown-extensions","text":"The default, standard, Markdown syntax, described at this website , with these differences . markdown_include : Command that embeds a markdown file into another. Headers will be shifted to subheaders relative to enclosing header. See the readme . plantuml_markdown : See the official readme . Supports non-UML tags like @startjson or math equations too. arithmatex : See the docs . Provides mathematical style and fonts for expressions. admonition and details : See the admonitions docs and details docs . Provides highlighted text cells for many purposes. Details are also called collapsible blocks . keys : You can embed keyboard symbols in text. See the docs . tabs : Enables content tabs. See the docs . tasklist : Enables GitHub style tasks list. See the docs . abbreviations : Enables explanations for abbrevations. See the docs . footnotes : Enables footnotes. See the docs . git-revision-date-localized : Enables linking last edit date of the page. See the docs .","title":"Supported Markdown extensions:"},{"location":"index.html#usage","text":"You can use markdown-docs both as a GitHub Acton or a Docker builder stage inside your dockerfile.","title":"Usage"},{"location":"index.html#as-github-action","text":"To use markdown-docs as a GitHub Action, use the following syntax in your workflow: - name : Generate HTML from Markdown uses : ldeluigi/markdown-docs@master with : src : doc dst : generated This means that every markdown file inside the doc folder in the current workspace will be converted and mapped to a corresponding HTML file inside the generated directory. You can pass . as src to search the entire repo for markdown files. dst folder will be emptied before generation. In order to make the \"last edit date\" plugin work you need to clone the full history of your documentation inside your CI. With GitHub actions this can be done using the option fetch-depth: 0 with the actions/checkout@v2 step.","title":"As GitHub Action"},{"location":"index.html#as-docker-builder","text":"To use markdown-docs as a Docker builder stage use the following syntax in your Dockerfile: FROM deloo/markdown-docs AS builder COPY docs/ /home/src ENV WORKSPACE = /home RUN makedocs \"src\" \"dst\" FROM ... COPY --from = builder /home/dst /var/www/static/ This means that first docker stage creates a container where it runs the makedocs script, then will copy the resulting, generated HTML files in the production image, specifically in /var/www/static . This can be useful for your static website hosting. See the Wiki for more examples.","title":"As Docker builder"},{"location":"index.html#notes-about-documenting-your-software","text":"The idea behind markdown-docs is that all the documentation that can be written in separate files from the code should be mantained like the code documentation, that is thinking about the content and not the appearence. In addition, some of the most important tools for documentation are UML diagrams. In particular, one of the most maintainable way to draw UMLs is PlantUML , which can generate UML diagrams for a text specification. One of the most important features of markdown-docs is the support of PlantUML syntax embedded inside documentation sources, in Markdown.","title":"Notes about documenting your software"}]}; var __search = { index: Promise.resolve(local_index) }