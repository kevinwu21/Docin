import{_ as s,c as n,o as a,a as l}from"./app.82736834.js";const d=JSON.parse('{"title":"lynx","description":"","frontmatter":{},"headers":[{"level":2,"title":"补充说明","slug":"补充说明","link":"#补充说明","children":[{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":3,"title":"选项","slug":"选项","link":"#选项","children":[]},{"level":3,"title":"参数","slug":"参数","link":"#参数","children":[]}]},{"level":2,"title":"内部命令","slug":"内部命令","link":"#内部命令","children":[]}],"relativePath":"linux/command/pages/lynx.md","lastUpdated":1666509709000}'),p={name:"linux/command/pages/lynx.md"},e=l(`<h1 id="lynx" tabindex="-1">lynx <a class="header-anchor" href="#lynx" aria-hidden="true">#</a></h1><p>纯文本模式的网页浏览器</p><h2 id="补充说明" tabindex="-1">补充说明 <a class="header-anchor" href="#补充说明" aria-hidden="true">#</a></h2><p><strong>lynx命令</strong> 是纯文本模式的网页浏览器，不支持图形、音视频等多媒体信息。</p><h3 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">lynx(选项</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">参数</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">-case：在搜索字符串时，区分大小写；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ftp：关闭ftp功能；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nobrowse：关闭目录浏览功能；</span></span>
<span class="line"><span style="color:#FFCB6B;">-noclor：关闭色彩显示模式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-reload：更新代理服务器的缓存，只对首页有效；</span></span>
<span class="line"><span style="color:#FFCB6B;">--color：如果系统支持彩色模式，则激活彩色模式；</span></span>
<span class="line"><span style="color:#FFCB6B;">--help：显示指令的帮助信息；</span></span>
<span class="line"><span style="color:#FFCB6B;">--versiom：显示指令的版本信息。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="参数" tabindex="-1">参数 <a class="header-anchor" href="#参数" aria-hidden="true">#</a></h3><p>URL：指定要访问的网站的URL地址。</p><h2 id="内部命令" tabindex="-1">内部命令 <a class="header-anchor" href="#内部命令" aria-hidden="true">#</a></h2><p><strong>移动命令</strong></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">下方向键：页面上的下一个链接(用高亮度显示</span><span style="color:#EEFFFF;">)。</span></span>
<span class="line"><span style="color:#FFCB6B;">上方向键：页面上的前一个链接(用高亮度显示</span><span style="color:#EEFFFF;">)。</span></span>
<span class="line"><span style="color:#FFCB6B;">回车和右方向键：跳转到链接指向的地址。</span></span>
<span class="line"><span style="color:#FFCB6B;">左方向键：回到上一个页面。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>滚动命令</strong></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">+、Page-Down、Space、Ctrl+f：向下翻页。</span></span>
<span class="line"><span style="color:#FFCB6B;">-、Page-Up、b、Ctrl+b：向上翻页。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+a：移动到当前页的最前面。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+e：移动到当前页的最后面。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+n：向下翻两行。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+p：往回翻两行。</span></span>
<span class="line"><span style="color:#EEFFFF;">)：向下翻半页。</span></span>
<span class="line"><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">：往回翻半页。</span></span>
<span class="line"><span style="color:#545454;font-style:italic;">#：回到当前页的 Toolbar 或 Banner。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>文件操作命令</strong></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker has-highlighted-lines" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">c：建立一个新文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">d：下载选中的文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">E：编辑选中的文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">f：为当前文件显示一个选项菜单。</span></span>
<span class="line"><span style="color:#FFCB6B;">m：修改选中文件的名字或位置。</span></span>
<span class="line"><span style="color:#FFCB6B;">r：删除选中的文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">t：Tag</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">highlighted</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">file。</span></span>
<span class="line"><span style="color:#FFCB6B;">u：上载一个文件到当前目录。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>其他命令</strong></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">?</span><span style="color:#EEFFFF;">、h：帮助。</span></span>
<span class="line"><span style="color:#FFCB6B;">a：把当前链接加入到一个书签文件里。</span></span>
<span class="line"><span style="color:#FFCB6B;">c：向页面的拥有者发送意见或建议。</span></span>
<span class="line"><span style="color:#FFCB6B;">d：下载当前链接。</span></span>
<span class="line"><span style="color:#FFCB6B;">e：编辑当前文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">g：跳转到一个用户</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">指定的URL或文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">G：编辑当前页的URL，并跳转到这个URL。</span></span>
<span class="line"><span style="color:#FFCB6B;">i：显示文档索引。</span></span>
<span class="line"><span style="color:#FFCB6B;">j：执行预先定义的“短”命令。</span></span>
<span class="line"><span style="color:#FFCB6B;">k：显示键盘命令列表。</span></span>
<span class="line"><span style="color:#FFCB6B;">l：列出当前页上所有链接的地址。</span></span>
<span class="line"><span style="color:#FFCB6B;">m：回到首页</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">。</span></span>
<span class="line"><span style="color:#FFCB6B;">o：设置选项。</span></span>
<span class="line"><span style="color:#FFCB6B;">p：把当前页输出到文件，e-mail，打印机或其他地方。</span></span>
<span class="line"><span style="color:#FFCB6B;">q：退出。</span></span>
<span class="line"><span style="color:#FFCB6B;">/：在当前页内查找字符串。</span></span>
<span class="line"><span style="color:#FFCB6B;">s：在外部搜索输入的字符串。</span></span>
<span class="line"><span style="color:#FFCB6B;">n：搜索下一个。</span></span>
<span class="line"><span style="color:#FFCB6B;">v：查看一个书签文件。</span></span>
<span class="line"><span style="color:#FFCB6B;">V：跳转到访问过的地址。</span></span>
<span class="line"><span style="color:#FFCB6B;">x：不使用缓存。</span></span>
<span class="line"><span style="color:#FFCB6B;">z：停止当前传输。</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">backspace</span><span style="color:#89DDFF;">]</span><span style="color:#EEFFFF;">：跳转到历史页</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">同</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">V</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">命令</span><span style="color:#89DDFF;">)</span><span style="color:#EEFFFF;">。</span></span>
<span class="line"><span style="color:#FFCB6B;">=：显示当前页的信息。</span></span>
<span class="line"><span style="color:#FFCB6B;">：查看当前页的源代码。</span></span>
<span class="line"><span style="color:#89DDFF;">!</span><span style="color:#FFCB6B;">：回到shell提示符下。</span></span>
<span class="line"><span style="color:#FFCB6B;">_：清除当前任务的所有授权信息。</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#EEFFFF;">：图形链接模式的切换开关。</span></span>
<span class="line"><span style="color:#FFCB6B;">@：8位传输模式或CJK模式的切换开关。</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#EEFFFF;">：pseudo_inlines 模式的切换开关。</span></span>
<span class="line"><span style="color:#89DDFF;">]</span><span style="color:#EEFFFF;">：为当前页或当前链接发送一个“head”请求。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+r：重新装如当前页并且刷新屏幕。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+w：刷新屏幕。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+u：删除输入的行。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+g：取消输入或者传送。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+t：跟踪模式的切换开关。</span></span>
<span class="line"><span style="color:#89DDFF;">;</span><span style="color:#FFCB6B;">：看Lynx对当前任务的跟踪记录。</span></span>
<span class="line"><span style="color:#FFCB6B;">Ctrl+k：调用</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">Cookie</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">Jar</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">页。</span></span>
<span class="line"><span style="color:#FFCB6B;">数字键：到后面的第</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">n</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">个链接。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,19),r=[e];function c(o,i,t,F,b,y){return a(),n("div",null,r)}const u=s(p,[["render",c]]);export{d as __pageData,u as default};
