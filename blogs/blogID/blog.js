var ajax = (request) => {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var cleanData = (data, dataID) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === dataID) {
            var blog = {
                id: Number(data[i].id),
                title: data[i].title,
                author: "风行",
                time: new Date(data[i].created_at).toLocaleString(),
                updateTime: new Date(data[i].updated_at).toLocaleString(),
                content: markdownCompile(data[i].body),
            }
            return blog
        }
    }
}

var templateBlog = (blog) => {
    var t = `
        <div class="blog-cell">
            <h1>${blog.title}</h1>
            <div class="blog-author">
                @<span>${blog.author}</span>
                创建于<time>${blog.time}</time>
                &nbsp;最后更新于<time>${blog.updateTime}</time>
            </div>
            <div class="blog-content">
                ${blog.content}
            </div>
            <a href="/blogs/build/index.html">返回</a>
        </div>
    `
    return t
}

var markdownCompile = (text) => {
    var converter = new showdown.Converter()
    var md = converter.makeHtml(text)
    return md
}

var insertBlog = (blog) => {
    var html = templateBlog(blog)
    var div = document.querySelector('.fengxing-blog')
    div.innerHTML = html
}

var changeTitle = (blog) => {
    var t = document.querySelector('title')
    t.innerHTML = `${blog.author}@${blog.title}`
}
var handleDataID = () => {
    var blog = document.querySelector('.fengxing-blog')
    var id = Number(blog.dataset.id)
    return id
}

var handleData = () => {
    var request = {
        method: 'GET',
        url: 'https://api.github.com/repos/ClinkzM/blogs/issues',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            var data = JSON.parse(response)
            var dataID = handleDataID()
            var blog = cleanData(data, dataID)
            insertBlog(blog)
            changeTitle(blog)
        },
    }
    ajax(request)
}

var __main = () => {
    handleData()
}
__main()
