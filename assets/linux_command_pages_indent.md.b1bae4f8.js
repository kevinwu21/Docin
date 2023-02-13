import{_ as s,c as n,o as a,a as l}from"./app.82736834.js";const y=JSON.parse('{"title":"indent","description":"","frontmatter":{},"headers":[{"level":2,"title":"补充说明","slug":"补充说明","link":"#补充说明","children":[{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":3,"title":"选项","slug":"选项","link":"#选项","children":[]},{"level":3,"title":"实例","slug":"实例","link":"#实例","children":[]}]}],"relativePath":"linux/command/pages/indent.md","lastUpdated":1666509709000}'),p={name:"linux/command/pages/indent.md"},e=l(`<h1 id="indent" tabindex="-1">indent <a class="header-anchor" href="#indent" aria-hidden="true">#</a></h1><p>格式化C语言的源文件</p><h2 id="补充说明" tabindex="-1">补充说明 <a class="header-anchor" href="#补充说明" aria-hidden="true">#</a></h2><p><strong>indent命令</strong> 可辨识C的原始代码文件，并加以格式化，以方便程序员阅读、修改等操作。</p><h3 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">indent(选项</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">源文件</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#FFCB6B;">或</span></span>
<span class="line"><span style="color:#FFCB6B;">indent（选项</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">源文件</span><span style="color:#89DDFF;">)(</span><span style="color:#FFCB6B;">-o</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">目标文件</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-hidden="true">#</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">-bad：在声明区加上空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-bap：添加空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-bbb：在注释后面添加空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-bc：在声明段中，如果出现逗号就换行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-bl：if（或是else、for等）与后面执行区段的“</span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">”不同行，且“</span><span style="color:#89DDFF;">}</span><span style="color:#EEFFFF;">”自成一行-bli</span><span style="color:#89DDFF;">&lt;</span><span style="color:#EEFFFF;">缩排格数</span><span style="color:#89DDFF;">&gt;</span><span style="color:#EEFFFF;">设置</span><span style="color:#89DDFF;">{}</span><span style="color:#EEFFFF;">缩排的格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-br：if（或是else、for等）与后面执行区段的“</span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">”同行，且“</span><span style="color:#89DDFF;">}</span><span style="color:#EEFFFF;">”自成一行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-bs：在sizeof之后空一格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-c&lt;栏数&gt;：将注释置于程序右侧指定的栏位；</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#82AAFF;">cd</span><span style="color:#FFCB6B;">&lt;栏数&gt;：将注释置于声明右侧指定的栏位；</span></span>
<span class="line"><span style="color:#FFCB6B;">-cdb：注释符号自成一行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ce：将else置于“</span><span style="color:#EEFFFF;">}”（if执行区段的结尾）之后；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ci：&lt;缩排格数&gt;：叙述过长而换行时，指定换行后缩排的格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-cli&lt;缩排格数&gt;：使用case时，switch缩排的格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-cp&lt;栏数&gt;：将注释置于else与elseif叙述右侧指定的栏位；</span></span>
<span class="line"><span style="color:#FFCB6B;">-cs：在case之后空一格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-d&lt;缩排格数&gt;：针对不是放在程序码右侧的注释，设置其缩排格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-di&lt;栏数&gt;：将声明区段的变量置于指定的栏位；</span></span>
<span class="line"><span style="color:#FFCB6B;">-fc1：针对放在每行最前端的注释，设置其格式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-fca：设置所有注释的格式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-gnu：使用指定的GNU格式，该参数为默认值；</span></span>
<span class="line"><span style="color:#FFCB6B;">-i&lt;格数&gt;：设置缩排的格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ip&lt;格数&gt;：设置参数的缩排格数；</span></span>
<span class="line"><span style="color:#FFCB6B;">-kr：指定使用Kernighan</span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">Ritchie的格式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-lp：叙述过长而换行，且叙述中包含了括号时，将括号中的每行起始栏位内容垂直对其排列；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nbad：在声明区段后不要加上空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nbap：在程序后面不添加空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nbbb：在注释段后面不添加空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nbc：在声明段中，即使出现逗号，也不换行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ncdb：注释符号不自成一行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nce：不将else置于“</span><span style="color:#EEFFFF;">}”后面；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ncs：不在case后面空一格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nfc1：不要格式化放在每行最前端的注释；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nfca：不用格式化任何的注释；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nip：参数不要缩排；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nlp：叙述过长而换行，且叙述中包含了括号时，不用将括号中的每行起始栏位垂直对其排列；</span></span>
<span class="line"><span style="color:#FFCB6B;">-npcs：在调用函数名之后，不要添加空格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-npro：不要读取indent的配置文件“.indent.pro”；</span></span>
<span class="line"><span style="color:#FFCB6B;">-npsl：程序类型与程序名称放在同一行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nsc：注释左侧不要添加星号；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nsob：不用处理多余的空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nss：若for或while区段仅有一行时，在分号前不加空格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-nv：不显示详细的信息；</span></span>
<span class="line"><span style="color:#FFCB6B;">-orig：使用berkeley格式；</span></span>
<span class="line"><span style="color:#FFCB6B;">-pcs：在调用函数名与“</span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">”之间添加空格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-psl：程序类型置于程序名称的前一行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-sc：在每行注释左侧添加星号；</span></span>
<span class="line"><span style="color:#FFCB6B;">-sob：删除多余的空白行；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ss：若for或swile区段仅有一行时，在分号前加上空格；</span></span>
<span class="line"><span style="color:#FFCB6B;">-st：将结果显示在标准输出设备上；</span></span>
<span class="line"><span style="color:#FFCB6B;">-T：数据类型名称缩排；</span></span>
<span class="line"><span style="color:#FFCB6B;">-ts&lt;格数&gt;：设置tab的长度；</span></span>
<span class="line"><span style="color:#FFCB6B;">-v：显示详细的执行过程；</span></span>
<span class="line"><span style="color:#FFCB6B;">--version：显示版本信息。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><h3 id="实例" tabindex="-1">实例 <a class="header-anchor" href="#实例" aria-hidden="true">#</a></h3><p>使用indent命令将C语言源文件&quot;test.c&quot;中所有的sizeof后面添加一个空格，输入如下命令：</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-darker" tabindex="0"><code><span class="line"><span style="color:#FFCB6B;">indent</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">-bs</span><span style="color:#EEFFFF;"> </span><span style="color:#C3E88D;">/home/rootlocal/桌面/test.c</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>执行上面的命令后，用户可以打开指定的源文件查看在sizeof后面是否都添加了一个空格。由于该命令的参数非常多，所以用户可以根据实际需要选择适合的参数进行使用即可。</p>`,12),r=[e];function c(o,i,t,F,b,B){return a(),n("div",null,r)}const u=s(p,[["render",c]]);export{y as __pageData,u as default};
