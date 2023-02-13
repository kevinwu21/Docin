import{_ as s,c as n,o as a,a as l}from"./app.82736834.js";const u=JSON.parse('{"title":"pico","description":"","frontmatter":{},"headers":[{"level":2,"title":"补充说明","slug":"补充说明","link":"#补充说明","children":[{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":3,"title":"选项","slug":"选项","link":"#选项","children":[]},{"level":3,"title":"参数","slug":"参数","link":"#参数","children":[]}]}],"relativePath":"linux/command/pages/pico.md","lastUpdated":1666509709000}'),e={name:"linux/command/pages/pico.md"},p=l(`<h1 id="pico" tabindex="-1">pico <a class="header-anchor" href="#pico" aria-hidden="true">#</a></h1><p>功能强大全屏幕的文本编辑器</p><h2 id="补充说明" tabindex="-1">补充说明 <a class="header-anchor" href="#补充说明" aria-hidden="true">#</a></h2><p><strong>pico命令</strong> 是功能强大全屏幕的文本编辑器。pico的操作简单，提供了丰富的快捷键。常用的快捷键如下：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">Ctrl+G：获得pico的帮助信息；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+O：保存文件内容，如果是新文件，需要输入文件名；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+R：在当前光标位置插入一个指定的文本文件内容；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+Y：向前翻页；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+V：向后翻页；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+w：对文件进行搜索；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+K：剪切当前文件行到粘贴缓冲区；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+U：粘贴缓冲区中的内容到当前光标所在位置；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+C：显示当前光标位置；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+T：调用拼写检查功能，对文档进行拼写检查；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+J：段落重排；</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+X：退出，当文件内容发生改变时，提供是否保存修改。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">pico(选项</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">参数</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">-b：开启置换的功能；</span></span>
<span class="line"><span style="color:#FFCB6B;">-d：开启删除的功能；</span></span>
<span class="line"><span style="color:#FFCB6B;">-e：使用完整的文件名称；</span></span>
<span class="line"><span style="color:#FFCB6B;">-f：支持键盘上F1、F2.</span><span style="color:#82AAFF;">.</span><span style="color:#FFCB6B;">.功能键；</span></span>
<span class="line"><span style="color:#FFCB6B;">-g：显示光标；</span></span>
<span class="line"><span style="color:#FFCB6B;">-h：在线帮助；</span></span>
<span class="line"><span style="color:#FFCB6B;">-j：开启切换的功能；</span></span>
<span class="line"><span style="color:#FFCB6B;">-k：预设pico在使用剪下命令时，会把光标所在的列的内容全部删除；</span></span>
<span class="line"><span style="color:#FFCB6B;">-m：开启鼠标支持的功能，您可用鼠标点选命令列表；</span></span>
<span class="line"><span style="color:#FFCB6B;">-n&lt;间隔秒数&gt;：设置多久检查一次新邮件；</span></span>
<span class="line"><span style="color:#FFCB6B;">-o&lt;工作目录&gt;：设置工作目录；</span></span>
<span class="line"><span style="color:#FFCB6B;">-q：忽略预设值；</span></span>
<span class="line"><span style="color:#FFCB6B;">-r&lt;编辑页宽&gt;：设置编辑文件的页宽；</span></span>
<span class="line"><span style="color:#FFCB6B;">-s&lt;拼字检查器&gt;：另外指定拼字检查器；</span></span>
<span class="line"><span style="color:#FFCB6B;">-t：启动工具模式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-v：启动阅读模式，用户只能观看，无法编辑文件的内容；</span></span>
<span class="line"><span style="color:#FFCB6B;">-w：关闭自动换行，通过这个参数可以编辑内容很长的列；</span></span>
<span class="line"><span style="color:#FFCB6B;">-x：关闭页面下方的命令列表；</span></span>
<span class="line"><span style="color:#FFCB6B;">-z：让pico可被Ctrl+z中断，暂存在后台作业里；</span></span>
<span class="line"><span style="color:#FFCB6B;">+&lt;列表编号&gt;：执行pico指令进入编辑模式时，从指定的列数开始编辑。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-hidden="true">#</a></h3><p>文件：指定要编辑的文件。</p>`,11),r=[p];function c(i,o,t,b,d,F){return a(),n("div",null,r)}const m=s(e,[["render",c]]);export{u as __pageData,m as default};
