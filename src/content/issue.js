class IssueDTO {
  issue_boards;
  issue_filter_settings;
  issue_list;
  issue_pagination;
  issue_with_alarms;
  constructor(data) {
    this.issue_boards = data.issue_boards;
    this.issue_filter_settings = data.issue_filter_settings;
    this.issue_list = data.issue_list;
    this.issue_pagination = data.issue_pagination;
    this.issue_with_alarms = data.issue_with_alarms;
  }
}

const body = document.querySelector("body");
document.querySelector(".info_finish")?.remove();
body.style.margin = "0";
body.style.padding = "0";

// Remove the unwanted text from body
if (body.innerText.includes('string(21) "www.prologistics.info"')) {
  body.innerHTML = body.innerHTML.replace(/string\(21\)\s*"www\.prologistics\.info"/g, "");
}

class Issues {
  api = {
    checklists: () =>
      "https://www.prologistics.info/api/issueLog/checklist/?issue_id=" + id,
    comments: (id) =>
      "https://www.prologistics.info/api/issueLog/comments/?comment_type=issuelog&page_id=" +
      id,
    issues_open: ({ board_id, page }) =>
      `https://www.prologistics.info/api/issueLog/list/?status=open&setting_view=1&issue_board=${board_id}&page=${page}`,
  };
  issues = new IssueDTO({
    issue_boards: "",
    issue_filter_settings: "",
    issue_list: "",
    issue_pagination: "",
    issue_with_alarms: "",
  });
  board_id = "13";
  users = {
    Orlinski: "1196",
    JurgowiakM: "1194",
		KaKazaniecki: "1193",
		Oleksander: "1686",
    RKobus: "1204",
  };
  constructor() {
    this.board = document.querySelector("td.rightSideBlock");
    this.table = document.createElement("table");
    this.board_row = document.createElement("tr");
    this.tools = document.createElement("div");
    this.user = this.getUser();
    this.init();
  }
  total = 0;

  init = async () => {
    try {
      const issues = await this.getIssue(this.board_id, 1);
      this.issues = new IssueDTO(issues);

      this.renderToolBar();
      this.renderColumns(this.issues.issue_list);

      this.tools.style = "display: flex; gap: 0.2rem; align-items: center;";
      this.table.append(this.board_row);

      this.board.append(this.table);
      this.table.insertAdjacentElement("beforebegin", this.tools);
    } catch (error) {
      new Notification(error.message || "Unexpected error happend.");
    }
  };

  importLinkify = () => {
    const script = document.createElement("script");
    // chrome-extension://jpncjjhjgbbjlglddfjeldbeojhbimmk/content/linkifyjs/linkify.min.js
    script.src = chrome.runtime.getURL("/content/linkifyjs/linkify.min.js");
    document.body.append(script);
  };

  renderColumns = (issue_list) => {
    this.board_row.innerHTML = "Filtering...";
    let board_columns = [];
    let map = {};
    for (const item of issue_list) {
      if (item.issue_board_column in map) {
        continue;
      }
      board_columns.push({
        id: item.issue_board_column,
        title: item.issue_board_column_name,
        ordering: item.issue_board_column,
      });
      map[item.issue_board_column] = 1;
    }

    this.table.style = "width: 100%";
    this.board_row.innerHTML = "";
    this.board_row.append(...this.createColumns(board_columns, issue_list));
    board_columns = [];
    map = {};
  };

  renderToolBar = () => {
    this.renderBoards();
    this.myTasks();
    this.allTasks();
  };

  isMyIssue = (issue) => {
    let isMyIssue = false;
    if ("issue_type" in issue) {
      isMyIssue = issue.issue_type.find(
        (item) => item.id === this.users[this.user.username],
      );
    }
    return isMyIssue;
  };

  isSunday = (issue) => {
    let isSunday = false;
    if ("issue_type" in issue) {
      isSunday = issue.issue_type.find((item) => item.id === "1238");
    }
    return isSunday;
  };

  isNewsletter = (issue) => {
    let isNewsletter = false;
    if ("issue_type" in issue) {
      isNewsletter = issue.issue_type.find((item) => item.id === "1197");
    }
    return isNewsletter;
  };

  myTasks = () => {
    const button = document.createElement("button");
    button.style = "font-size: 1.2rem; margin-left: 0.4rem; padding: 0.2rem;";
    button.textContent = "My tasks";
    button.addEventListener("click", () => {
      const filtered_issues = this.issues.issue_list.filter((item) => {
        if (this.user.name === item.solving_user_name) {
          return true;
        }

        if (this.isMyIssue(item)) {
          return true;
        }

        return false;
      });
      this.renderColumns(filtered_issues);
    });

    this.tools.append(button);
  };

  allTasks = () => {
    const button = document.createElement("button");
    button.style = "font-size: 1.2rem; margin-left: 0.4rem; padding: 0.2rem;";
    button.textContent = "All tasks";
    button.addEventListener("click", () => {
      this.renderColumns(this.issues.issue_list);
    });

    this.tools.append(button);
  };

  renderBoards = () => {
    const select = document.createElement("select");
    select.style = "padding: 0.2rem; font-size: 1.2rem; border-radius: 0.2rem;";

    const options = [];
    const entries = Object.entries(this.issues.issue_boards).filter(
      (item) => item[1].inactive !== "1",
    );
    for (const [board_id, { name, inactive }] of entries) {
      options.push(this.renderBoard({ id: board_id, name: name }));
    }

    select.append(...options);
    select.addEventListener("change", async (ev) => {
      this.board_id = String(ev.target.value);
      const issues = await this.getIssue(this.board_id, 1);
      this.issues = new IssueDTO(issues);
      this.renderColumns(this.issues.issue_list);
    });

    this.tools.append(select);
  };

  renderBoard = ({ id, name }) => {
    const option = document.createElement("option");
    option.textContent = name;
    option.value = id;
    if (id === "13") option.selected = true;
    return option;
  };

  getUser = () => {
    const scriptData = [...document.body.querySelectorAll("script")].find(
      (item) => item.textContent.includes("pushHost"),
    );
    try {
      const user_data = JSON.parse(
        scriptData.textContent.split(";")[3].split("=")[1],
      );
      return user_data;
    } catch (error) {
      console.error(error.message);
      return document.cookie.split(";")[2].split("=")[1];
    }
  };

  getIssue = async (board_id, page) => {
    let _data = {};
    try {
      this.board_row.innerHTML = "Loading...";
      const response = await fetch(this.api.issues_open({ board_id, page }));
      if (!response.ok) {
        throw new Error("Error happend while issues loading. Try later.");
      }
      const json = await response.json();

      this.total = (this.total || Number(json.issue_pagination.total)) - 50;
      if (this.total > 0) {
        const new_page_data = await this.getIssue(board_id, page + 1);
        _data = {
          ...new_page_data,
          issue_list: [...json.issue_list, ...new_page_data.issue_list],
        };
        return _data;
      }

      this.board_row.innerHTML = "";
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  createColumns = (board_columns, issue_list) => {
    const columns = [];
    const sort_columns = board_columns.toSorted(
      (a, b) => Number(a.ordering) - Number(b.ordering),
    );
    for (const column of sort_columns) {
      const column_issues = issue_list.filter(
        (item) => item.issue_board_column === column.id,
      );
      columns.push(this.createColumn(column, column_issues));
    }
    return columns;
  };

  createColumn = (column, issue_list) => {
    const td = document.createElement("td");
    td.style =
      "vertical-align: top; padding-right: 1rem; background-color: #e7e7e7; padding: 1rem; margin-right: 0.2rem; border-radius: 0.6rem;";

    const columnTitle = document.createElement("p");
    columnTitle.textContent = column.title;
    columnTitle.style =
      "color: #172b4d; font-weight: 600; vertical-align: top; margin: 0; margin-bottom: 1rem;";

    const div = document.createElement("div");
    div.style =
      "display: flex; flex-direction: column; gap: 0.6rem; max-height: 80vh; overflow-y: auto;";

    const issueCards = [];
    // ASCENDING sort a -b
    const sort_issue = issue_list.toSorted(
      (a, b) =>
        Number(a.issue_board_column_ordering) -
        Number(b.issue_board_column_ordering),
    );
    for (const issue of sort_issue) {
      issueCards.push(this.createIssueCard(issue));
    }

    div.append(...issueCards);
    td.append(columnTitle);
    td.append(div);
    return td;
  };

  createIssueCard = (issue) => {
    const div = document.createElement("div");
    div.style =
      "padding: 0.6rem; border-radius: 0.4rem; background-color: #ffffff; display: block; color: #626F86; position: relative; width: 240px; text-wrap: pretty; flex-shrink: 0; overflow-x: hidden;";
    const isNS = this.isNewsletter(issue);
    if (isNS) {
      div.style.background = isNS.color;
    }

    if (this.isMyIssue(issue)) {
      div.style.border = "2px solid #ffbfa6";
    }

    if (this.isSunday(issue)) {
      div.style.background = "#b1d9b87a";
    }

    const a = document.createElement("a");
    a.href = "react/logs/issue_logs/" + issue.id;
    a.target = "_blank";
    a.style = "color: #626F86; text-wrap: pretty;";

    const progress = document.createElement("div");
    progress.style = `position: absolute; top: 0; left: 0; right: 0; height: 3px; width: ${issue.checklists_progress}; background-color: #6c9ffb;`;

    // CONTAINER BTN
    const containerBtns = document.createElement("div");
    containerBtns.style = "display: flex; gap: .4rem;";

    const comments_btn = document.createElement("button");
    comments_btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-dot"><path d="M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"/><circle cx="18" cy="6" r="3"/></svg>';
    comments_btn.style =
      "border: none; background-color: #eeeeee; padding: 0.4rem; border-radius: 0.2rem; display: flex; gap: 4px; font-size: 12px; font-weight: 600; margin: 0; margin-bottom: 0.4rem; cursor: pointer;";
    comments_btn.addEventListener("click", async (ev) => {
      comments_btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-dot"><path d="M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"/><circle cx="18" cy="6" r="3"/></svg>';
      let comments = await this.loadIssue(ev, issue.id);
      // PING every 10 seconds messages
      setInterval(async () => {
        const new_comments = await this.loadIssue(ev, issue.id);
        if (new_comments.comments.length > comments.comments.length) {
          comments = new_comments;
          comments_btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-dot"><path d="M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7"/><circle stroke="red" fill="red" cx="18" cy="6" r="3"/></svg>';
        }
      }, 300_000);
      const unsub = this.showModal({ comments: comments.comments, issue });
    });
    comments_btn.title = "Comments";

    const dropbox_btn = document.createElement("a");
    dropbox_btn.innerHTML =
      '<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.4 39.5" width="12" height="12"><style>.st0{fill:#0062ff}</style><path class="st0" d="M10.6 1.7L0 8.5l10.6 6.7 10.6-6.7zm21.2 0L21.2 8.5l10.6 6.7 10.6-6.7zM0 22l10.6 6.8L21.2 22l-10.6-6.8zm31.8-6.8L21.2 22l10.6 6.8L42.4 22zM10.6 31l10.6 6.8L31.8 31l-10.6-6.7z"/></svg>';
    dropbox_btn.style =
      "border: none; background-color: #eeeeee; padding: 0.4rem; border-radius: 0.2rem; display: flex; gap: 4px; font-size: 12px; font-weight: 600; margin: 0; margin-bottom: 0.4rem; cursor: pointer;";
    dropbox_btn.href = issue["Campaign dropbox"];
    dropbox_btn.target = "_blank";
    dropbox_btn.title = "Dropbox";

    const spreadsheet_btn = document.createElement("a");
    spreadsheet_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 242423 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><defs><mask id="c"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="200294" y1="91174.8" x2="200294" y2="176113"><stop offset="0" stop-opacity=".02" stop-color="#fff"/><stop offset="1" stop-opacity=".2" stop-color="#fff"/></linearGradient><path fill="url(#a)" d="M158015 84111h84558v99065h-84558z"/></mask><mask id="e"><radialGradient id="b" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="0" fx="0" fy="0"><stop offset="0" stop-opacity="0" stop-color="#fff"/><stop offset="1" stop-opacity=".098" stop-color="#fff"/></radialGradient><path fill="url(#b)" d="M-150-150h242723v333633H-150z"/></mask><radialGradient id="f" gradientUnits="userSpaceOnUse" cx="9696.85" cy="10000.4" r="166667" fx="9696.85" fy="10000.4"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></radialGradient><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="200294" y1="95125.2" x2="200294" y2="172162"><stop offset="0" stop-color="#263138"/><stop offset="1" stop-color="#263138"/></linearGradient></defs><g fill-rule="nonzero"><path d="M151513 0H22729C10227 0 1 10227 1 22728v287877c0 12505 10227 22728 22728 22728h196966c12505 0 22728-10224 22728-22728V90911l-53028-37880L151513 0z" fill="#0f9c57"/><path d="M60606 162880v109853h121216V162880H60606zm53032 94698H75757v-18938h37881v18938zm0-30301H75757v-18946h37881v18946zm0-30310H75757v-18936h37881v18936zm53030 60611h-37884v-18938h37884v18938zm0-30301h-37884v-18946h37884v18946zm0-30310h-37884v-18936h37884v18936z" fill="#f0f0f0"/><path mask="url(#c)" fill="url(#d)" d="M158165 84261l84258 84245V90911z"/><path d="M151513 0v68184c0 12557 10173 22727 22727 22727h68183L151513 0z" fill="#87cdac"/><path d="M22728 0C10226 0 0 10227 0 22729v1893C0 12123 10227 1894 22728 1894h128784V1H22728z" fill="#fff" fill-opacity=".2"/><path d="M219694 331443H22728C10226 331443 0 321213 0 308715v1890c0 12505 10227 22728 22728 22728h196966c12505 0 22728-10224 22728-22728v-1890c0 12499-10224 22728-22728 22728z" fill="#263138" fill-opacity=".2"/><path d="M174239 90911c-12554 0-22727-10170-22727-22727v1893c0 12557 10173 22727 22727 22727h68183v-1893h-68183z" fill="#263138" fill-opacity=".102"/><path d="M151513 0H22729C10227 0 1 10227 1 22729v287876c0 12505 10227 22728 22728 22728h196966c12505 0 22728-10224 22728-22728V90911L151513 0z" mask="url(#e)" fill="url(#f)"/></g></svg>`;
    spreadsheet_btn.style =
      "border: none; background-color: #eeeeee; padding: 0.4rem; border-radius: 0.2rem; display: flex; gap: 4px; font-size: 12px; font-weight: 600; margin: 0; margin-bottom: 0.4rem; cursor: pointer;";
    spreadsheet_btn.href = issue["Translation spreadsheet newsletter"];
    spreadsheet_btn.target = "_blank";
    spreadsheet_btn.title = "Spreadsheet";

    const sa_btn = document.createElement("a");
    sa_btn.innerHTML = "SA";
    sa_btn.style =
      "border: none; background-color: #eeeeee; padding: 0.4rem; border-radius: 0.2rem; display: flex; gap: 4px; font-size: 12px; font-weight: 600; font-size: 10px; margin: 0; margin-bottom: 0.4rem; cursor: pointer;";
    sa_btn.href = issue["SA Details link "];
    sa_btn.target = "_blank";
    sa_btn.title = "Sa details";

    containerBtns.append(comments_btn);
    if (issue["Campaign dropbox"]) {
      containerBtns.append(dropbox_btn);
    }

    if (issue["Translation spreadsheet newsletter"]) {
      containerBtns.append(spreadsheet_btn);
    }

    if (issue["SA Details link "]) {
      containerBtns.append(sa_btn);
    }

    const issue_info = document.createElement("div");
    issue_info.style = "display: flex; flex-direction: column; gap: 0.2rem;";
    // CONTAINER BTN

    const issueInfo = [
      {
        title: {
          value: "Solving user: ",
        },
        description: {
          value: issue.solving_user_name,
        },
        style: {
          fontWeight: "600",
        },
      },
      {
        title: {
          value: "Priority: ",
        },
        description: {
          value: issue.issue_priority,
          style: {
            width: "fit-content",
            padding: "0.2rem",
            borderRadius: "0.2rem",
            background: issue.issue_priority_color,
          },
        },
      },
    ];

    const issueInfoElemens = [];
    for (const element of issueInfo) {
      issueInfoElemens.push(...this.issueInfo(element));
    }
    issue_info.append(...issueInfoElemens);

    const title = document.createElement("p");
    title.textContent = issue.issue;
    title.style =
      "font-size: 12px; font-weight: 500; margin: 0; margin-bottom: 1rem;";
    a.append(title);

    div.append(a);
    if (issue.checklists_progress !== "-") {
      div.append(progress);
    }
    div.append(containerBtns);
    div.append(issue_info);
    return div;
  };

  createComment = (comment) => {
    const div = document.createElement("div");
    div.style =
      "padding: 0.6rem; border-radius: 0.4rem; background-color: #ffffff; color: #626F86; position: relative; word-break: break-word; border: 1px solid #ececec; overflow: hidden; flex-shrink: 0;";

    const options = { defaultProtocol: "https", target: "_blank" };
    const parsed_content_with_links = linkifyHtml(comment.comment, options);

    const title = document.createElement("p");
    title.innerHTML = parsed_content_with_links.replaceAll("\n", "<br>");
    title.style =
      "font-size: 12px; font-weight: 500; margin: 0; margin-bottom: 1rem;";

    const responsible_user = document.createElement("p");
    responsible_user.innerHTML = "User: " + comment.full_username;
    responsible_user.style =
      "font-size: 10px; font-weight: 400; margin: 0; margin-bottom: 0.6rem;";

    const date = document.createElement("p");
    date.innerHTML = "Date: " + comment.create_date;
    date.style = "font-size: 10px; font-weight: 400; margin: 0;";

    div.append(title);
    div.append(responsible_user);
    div.append(date);
    return div;
  };

  issueInfo({ title, description }) {
    const _title = document.createElement("p");
    _title.textContent = title.value;
    _title.style = "font-size: 10px; margin: 0;";
    Object.assign(_title.style, title.style);

    const _description = document.createElement("p");
    _description.textContent = description.value;
    _description.style = "font-size: 12px; margin: 0;";
    Object.assign(_description.style, description.style);

    return [_title, _description];
  }

  loadIssue = async (ev, issueId) => {
    try {
      const response = await fetch(this.api.comments(issueId));
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  createComments = (comments) => {
    const comments_to_render = [];
    for (const comment of comments) {
      comments_to_render.push(this.createComment(comment));
    }
    return comments_to_render;
  };

  showModal = ({ comments, issue }) => {
    document.body.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.style =
      "display: block; width: 100%; position: fixed; inset: 0; z-index: 10; background: #242424aa";

    const div = document.createElement("div");
    div.style =
      "display: block; position: fixed; height: 100vh; right: 0; top: 0; width: 50vw; background: #ffffff; padding: 1rem; z-index: 100; display: flex; flex-direction: column; gap: 0.4rem; box-sizing: border-box;";

    const container = document.createElement("div");
    container.style =
      "display: flex; flex-direction: column; gap: 0.6rem; max-height: 90vh; overflow-y: auto; margin-top: 1rem; flex-grow: 1";

    const header_container = document.createElement("div");
    header_container.style =
      "display: flex; justify-content: space-between; align-items: center;";

    const title = document.createElement("a");
    title.target = "_blank";
    title.href = "react/logs/issue_logs/" + issue.id;
    title.textContent = issue.issue;
    title.style = "font-size: 22px; font-weight: 500; color: #242424;";

    const close_btn = document.createElement("button");
    close_btn.addEventListener("click", () => {
      overlay.style = "display: none;";
      div.style = "display: none;";
      document.body.style.overflow = "auto";
    });
    close_btn.style = "font-size: 22px; background-color: none; border: none;";
    close_btn.textContent = "X";

    header_container.append(...[title, close_btn]);

    const message_container = document.createElement("div");
    message_container.style =
      "display: flex; gap: 0.4rem; flex-direction: column; text-align: left;";

    const error_message = document.createElement("p");
    error_message.textContent = "";
    error_message.style = "font-size: 10px; color: #ff000030;";

    const textareaState = {};
    const textarea = document.createElement("textarea");
    textarea.rows = 10;
    textarea.style =
      "resize: none; width: 100%; border-radius: .4rem; padding: 0.2rem;";
    textarea.addEventListener("change", (ev) => {
      error_message.textContent = "";
      textareaState.message = ev.target.value;
    });

    const send_message = document.createElement("button");
    send_message.style = "width: 100%; padding: 0.4rem;";
    send_message.textContent = "Send";
    send_message.addEventListener("click", async () => {
      if (textareaState.message.trim().length > 0) {
        try {
          const comments = await this.sendComment({
            comment: textareaState.message,
            issue_id: issue.id,
          });
          container.append(...this.createComments(comments));
        } catch (error) {
          error_message.textContent = error.message;
        }
      }
    });

    message_container.append(error_message);
    message_container.append(textarea);
    message_container.append(send_message);

    overlay.addEventListener("click", () => {
      overlay.style = "display: none;";
      div.style = "display: none;";
      document.body.style.overflow = "auto";
    });

    div.append(header_container);
    div.append(container);
    div.append(message_container);
    container.append(...this.createComments(comments));

    document.body.append(div);
    document.body.append(overlay);

    return () => {
      overlay.style = "display: none;";
      div.style = "display: none;";
      document.body.style.overflow = "auto";
    };
  };

  sendComment = async ({ issue_id, comment }) => {
    try {
      const response = await fetch(
        "https://www.prologistics.info/api/comments/save/",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
          },
          referrer: `https://www.prologistics.info/react/logs/issue_logs/${issue_id}`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `page_id=${issue_id}&comment_type=issuelog&comment=${comment}`,
          method: "POST",
          mode: "cors",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      return result.comments;
    } catch (error) {
      throw error;
    }
  };
}
// uncomment below to enable floating menu functionality
// // Floating Menu Implementation
// class FloatingMenuManager {
//   constructor() {
//     this.isMenuVisible = true;
//     this.init();
//   }

//   init() {
//     // Wait for DOM to be ready
//     if (document.readyState === 'loading') {
//       document.addEventListener('DOMContentLoaded', () => this.setup());
//     } else {
//       this.setup();
//     }
//   }

//   setup() {
//     console.log('Setting up floating menu...');
//     this.injectStyles();
//     setTimeout(() => {
//       this.transformMenu();
//       this.createToggleButton();
//       this.setupEventListeners();
//     }, 100); // Small delay to ensure page is fully loaded
//   }

//   injectStyles() {
//     // Check if styles are already injected
//     if (document.getElementById('floating-menu-styles')) return;

//     try {
//       const link = document.createElement('link');
//       link.id = 'floating-menu-styles';
//       link.rel = 'stylesheet';
//       link.href = chrome.runtime.getURL('content/startphp_styles.css');
//       document.head.appendChild(link);
//       console.log('Floating menu styles injected');
//     } catch (error) {
//       console.error('Error injecting styles:', error);
//     }
//   }

//   transformMenu() {
//     const leftMenu = document.querySelector('.leftSideMenu');
//     if (!leftMenu) {
//       console.warn('Left menu not found');
//       return;
//     }

//     console.log('Transforming menu...');

//     // Clone the menu content
//     const menuContent = leftMenu.cloneNode(true);
    
//     // Hide the original menu
//     leftMenu.classList.add('original-hidden');
    
//     // Create floating menu container
//     const floatingMenu = document.createElement('div');
//     floatingMenu.className = 'leftSideMenu floating-menu';
//     floatingMenu.id = 'floating-left-menu';
    
//     // Transfer content
//     floatingMenu.innerHTML = menuContent.innerHTML;
    
//     // Clean up the content (remove inline styles that conflict)
//     this.cleanMenuContent(floatingMenu);
    
//     // Append to body
//     document.body.appendChild(floatingMenu);
    
//     this.floatingMenu = floatingMenu;
//     console.log('Floating menu created and added to page');
//   }

//   cleanMenuContent(menu) {
//     console.log('Cleaning menu content and hiding disabled items...');
    
//     // Remove nowrap attribute and conflicting styles
//     menu.removeAttribute('nowrap');
    
//     // First pass: identify and hide disabled menu items
//     const links = menu.querySelectorAll('a');
//     const disabledElements = [];
    
//     links.forEach(link => {
//       // Enhanced disabled link detection
//       const linkStyle = link.getAttribute('style') || '';
//       const computedStyle = window.getComputedStyle(link);
      
//       const isDisabled = linkStyle.includes('color:gray') || 
//                         linkStyle.includes('color: gray') ||
//                         linkStyle.includes('pointer-events: none') ||
//                         linkStyle.includes('pointer-events:none') ||
//                         linkStyle.includes('cursor: default') ||
//                         linkStyle.includes('cursor:default') ||
//                         computedStyle.pointerEvents === 'none' ||
//                         computedStyle.color === 'gray' ||
//                         computedStyle.cursor === 'default';
      
//       if (isDisabled) {
//         console.log('Hiding disabled menu item:', link.textContent.trim());
//         link.style.display = 'none';
//         disabledElements.push(link);
//         return;
//       }

//       // Clean all nbsp entities and whitespace from active links
//       const linkText = link.innerHTML;
      
//       // Remove all &nbsp; entities and replace with proper spacing
//       const cleanText = linkText
//         .replace(/&nbsp;/g, '') // Remove all &nbsp; entities
//         .replace(/\s+/g, ' ')   // Replace multiple spaces with single space
//         .trim();               // Remove leading/trailing whitespace
      
//       link.innerHTML = cleanText;
      
//       // Apply indentation based on original nesting level
//       const nbspCount = (linkText.match(/&nbsp;/g) || []).length;
//       if (nbspCount >= 4) {
//         link.style.paddingLeft = '20px';
//         link.style.fontSize = '12px';
//       }
//     });

//     // Second pass: clean up orphaned elements around disabled items
//     this.cleanupOrphanedElements(menu, disabledElements);

//     // Clean up any script or unwanted elements
//     const scripts = menu.querySelectorAll('script');
//     scripts.forEach(script => script.remove());
    
//     // Additional cleanup: remove any remaining &nbsp; entities from the entire menu
//     menu.innerHTML = menu.innerHTML
//       .replace(/&nbsp;/g, ' ')           // Replace all &nbsp; with spaces
//       .replace(/\s+/g, ' ')              // Replace multiple spaces with single space
//       .replace(/>\s+</g, '><')           // Remove spaces between tags
//       .replace(/^\s+|\s+$/g, '');        // Remove leading/trailing whitespace
    
//     console.log(`Menu cleanup complete. Hidden ${disabledElements.length} disabled items.`);
//   }

//   cleanupOrphanedElements(menu, disabledElements) {
//     // Remove all BR tags completely
//     const brTags = menu.querySelectorAll('br');
//     brTags.forEach(br => br.remove());
    
//     // Clean up text nodes and whitespace
//     const allNodes = [];
//     const walker = document.createTreeWalker(
//       menu,
//       NodeFilter.SHOW_ALL,
//       null,
//       false
//     );
    
//     let node;
//     while (node = walker.nextNode()) {
//       allNodes.push(node);
//     }

//     // Process text nodes - remove empty ones and clean whitespace
//     allNodes.forEach(node => {
//       if (node.nodeType === Node.TEXT_NODE) {
//         const text = node.textContent;
        
//         // Remove empty text nodes or those with only whitespace/nbsp
//         if (!text || text.trim() === '' || text.match(/^[\s&nbsp;]*$/)) {
//           node.remove();
//           return;
//         }
        
//         // Clean remaining text nodes
//         const cleanText = text
//           .replace(/&nbsp;/g, ' ')  // Replace &nbsp; with regular space
//           .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
//           .trim();                  // Remove leading/trailing whitespace
        
//         if (cleanText) {
//           node.textContent = cleanText;
//         } else {
//           node.remove();
//         }
//       }
//     });
    
//     // Remove any remaining empty elements
//     const emptyElements = menu.querySelectorAll('*:empty:not(input):not(img):not(br)');
//     emptyElements.forEach(el => {
//       if (el.tagName !== 'INPUT' && el.tagName !== 'IMG' && el.tagName !== 'SELECT') {
//         el.remove();
//       }
//     });
//   }

//   createToggleButton() {
//     // Remove existing button if any
//     const existingButton = document.getElementById('menu-toggle-btn');
//     if (existingButton) {
//       existingButton.remove();
//     }

//     const toggleButton = document.createElement('button');
//     toggleButton.className = 'menu-toggle-button menu-visible';
//     toggleButton.id = 'menu-toggle-btn';
//     toggleButton.innerHTML = `
//       <div class="hamburger">
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     `;
//     toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
//     toggleButton.setAttribute('title', 'Toggle menu');
    
//     document.body.appendChild(toggleButton);
//     this.toggleButton = toggleButton;
//     console.log('Toggle button created');
//   }

//   setupEventListeners() {
//     if (!this.toggleButton || !this.floatingMenu) return;

//     this.toggleButton.addEventListener('click', (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       this.toggleMenu();
//     });

//     // Keyboard support
//     document.addEventListener('keydown', (e) => {
//       if (e.key === 'Escape' && this.isMenuVisible) {
//         this.hideMenu();
//       }
//     });

//     console.log('Event listeners set up');
//   }

//   toggleMenu() {
//     if (this.isMenuVisible) {
//       this.hideMenu();
//     } else {
//       this.showMenu();
//     }
//   }

//   hideMenu() {
//     if (!this.floatingMenu || !this.toggleButton) return;
    
//     this.floatingMenu.classList.add('hidden');
//     this.toggleButton.classList.remove('menu-visible');
//     this.isMenuVisible = false;
//     console.log('Menu hidden');
//   }

//   showMenu() {
//     if (!this.floatingMenu || !this.toggleButton) return;
    
//     this.floatingMenu.classList.remove('hidden');
//     this.toggleButton.classList.add('menu-visible');
//     this.isMenuVisible = true;
//     console.log('Menu shown');
//   }
// }

// // Initialize the floating menu when page loads
// let floatingMenuManager;

// // Check if we're on the right page before initializing
// if (window.location.href.includes('start.php')) {
//   console.log('Initializing floating menu for start.php page');
//   floatingMenuManager = new FloatingMenuManager();
// } else {
//   console.log('Not on start.php page, skipping floating menu initialization');
// }

new Issues();
