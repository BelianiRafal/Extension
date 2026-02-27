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

// inject css - prolo messes normal styles after user log ins
function injectStartCss() {
  try {
    const id = "prolo-start-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("content/start.php/start_php.css");
    document.head.appendChild(link);
  } catch (err) {
    console.warn("injectStartCss:", err?.message || err);
  }
}
injectStartCss();

// Remove the unwanted text from body
if (body.innerText.includes('string(21) "www.prologistics.info"')) {
  body.innerHTML = body.innerHTML.replace(
    /string\(21\)\s*"www\.prologistics\.info"/g,
    ""
  );
}

// prolo needs this string or won't let you log in xd
// document.body.innerHTML = document.body.innerHTML
//   .replace(/Hello\s+[^!]+!/g, "")
//   .replace(
//     /The last time you login was\s*\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/g,
//     ""
//   );

document.querySelector("#fulltable")?.remove();
// document.querySelector(".leftSideMenu").style.display = "none";

class Issues {
  api = {
    checklists: () =>
      `${window.location.origin}/api/issueLog/checklist/?issue_id=${id}`,
    comments: (id) =>
      `${window.location.origin}/api/issueLog/comments/?comment_type=issuelog&page_id=${id}`,
    issues_open: ({ board_id, page }) =>
      `${window.location.origin}/api/issueLog/list/?status=open&setting_view=1&issue_board=${board_id}&page=${page}`,
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
    DmyKrapyvianskyi: "5319",
    OleHrytsa: "1686",
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
    document.querySelectorAll("table").forEach((table) => {
      table.cellPadding = "0";
      table.cellSpacing = "0";
      table.border = "0";
    });

    try {
      const issues = await this.getIssue(this.board_id, 1);
      this.issues = new IssueDTO(issues);

      this.renderToolBar();
      this.renderColumns(this.issues.issue_list);

      this.tools.className = "issues-tools";
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

    this.table.className = "issues-table";
    this.board_row.innerHTML = "";
    this.board_row.append(...this.createColumns(board_columns, issue_list));
    board_columns = [];
    map = {};
  };

  renderToolBar = () => {
    this.goToIndex();
    this.renderBoards();
    this.myTasks();
    this.allTasks();
  };

  isMyIssue = (issue) => {
    let isMyIssue = false;
    if ("issue_type" in issue) {
      isMyIssue = issue.issue_type.find(
        (item) => item.id === this.users[this.user?.username ?? this.user]
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

  isCampaignBanners = (issue) => {
    let isCampaignBanners = false;
    if ("issue_type" in issue) {
      isCampaignBanners = issue.issue_type.find((item) => item.id === "1192");
    }
    return isCampaignBanners;
  };

  isCGB = (issue) => {
    let isCGB = false;
    if ("issue_type" in issue) {
      isCGB = issue.issue_type.find((item) => item.id === "1203");
    }
    return isCGB;
  };

  isNewsletter = (issue) => {
    let isNewsletter = false;
    if ("issue_type" in issue) {
      isNewsletter = issue.issue_type.find((item) => item.id === "1197");
    }
    return isNewsletter;
  };

  goToIndex = () => {
    const button = document.createElement("button");
    button.className = "btn-task";
    button.className = "btn-task";
    button.textContent = "Open Home (/)";
    button.addEventListener("click", () => {
      window.open(`https://${window.location.hostname}/`, "_blank");
    });

    this.tools.append(button);
  };

  myTasks = () => {
    const button = document.createElement("button");
    button.className = "btn-task";
    button.textContent = "My tasks";
    button.addEventListener("click", () => {
      const filtered_issues = this.issues.issue_list.filter((item) => {
        if (this.user === item.solving_resp_username) {
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
    button.className = "btn-task";
    button.textContent = "All tasks";
    button.addEventListener("click", () => {
      this.renderColumns(this.issues.issue_list);
    });

    this.tools.append(button);
  };

  renderBoards = () => {
    const select = document.createElement("select");
    select.className = "issues-select";

    const options = [];
    const entries = Object.entries(this.issues.issue_boards).filter(
      (item) => item[1].inactive !== "1"
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
      (item) => item.textContent.includes("pushHost")
    );
    try {
      const user_data = JSON.parse(
        scriptData.textContent.split(";")[3].split("=")[1]
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
    const preferred = [
      "CAMPAIGN HTML",
      "HTML TASKS",
      "CENTRAL GRID BANNERS",
      "CAMPAIGN GRAPHICS",
      "CAMPAIGNS",
      "GRAPHIC OTHER TASKS",
      "PERFORMANCE MARKETING",
    ];

    const sort_columns = board_columns.toSorted((a, b) => {
      const aTitle = (a.title || "").toString().toUpperCase().trim();
      const bTitle = (b.title || "").toString().toUpperCase().trim();
      const ai = preferred.indexOf(aTitle);
      const bi = preferred.indexOf(bTitle);

      // If either is in preferred list, use that order
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) return 1; // b is preferred, a goes after
        if (bi === -1) return -1; // a is preferred, b goes after
        return ai - bi; // both preferred -> their index order
      }

      // Fallback: numeric ordering then title
      const ao = Number(a.ordering || 0);
      const bo = Number(b.ordering || 0);
      if (ao !== bo) return ao - bo;
      return aTitle.localeCompare(bTitle);
    });
    for (const column of sort_columns) {
      const column_issues = issue_list.filter(
        (item) => item.issue_board_column === column.id
      );
      columns.push(this.createColumn(column, column_issues));
    }
    return columns;
  };

  getTranslationsChecklist = async (issue_id) => {
    if (!issue_id) {
      console.warn("getTranslationsChecklist: missing issue_id");
      return null;
    }
    try {
      const url = `${window.location.origin}/api/issueLog/checklist/?issue_id=${issue_id}`;
      const resp = await fetch(url, { credentials: "include" });
      if (!resp.ok) {
        console.warn("getTranslationsChecklist: fetch failed", resp.status);
        return null;
      }
      const json = await resp.json();
      const checklists = json?.checklists || [];
      const translationsChecklist = checklists.find(
        (c) => c.title && c.title.toLowerCase().includes("translations")
      );
      if (!translationsChecklist) {
        console.info(
          "getTranslationsChecklist: no translations checklist found"
        );
        return null;
      }

      const checkpoints = (translationsChecklist.checkpoints || []).map(
        (cp) => ({ description: cp.description, done: cp.done === "1" })
      );

      const prev = document.getElementById("translations-checklist-panel");
      if (prev) prev.remove();

      const wrapper = document.createElement("div");
      wrapper.id = "translations-checklist-panel";
      wrapper.className = "translations-wrapper";

      const title = document.createElement("div");
      title.textContent = translationsChecklist.title;
      title.className = "checklist-title";
      wrapper.appendChild(title);

      const listContainer = document.createElement("div");
      listContainer.className = "listContainer expanded";

      if (checkpoints.length === 0) {
        const empty = document.createElement("span");
        empty.className = "emptyMessage";
        empty.textContent = "No checkpoints";
        listContainer.appendChild(empty);
      } else {
        checkpoints.forEach((cp) => {
          const item = document.createElement("div");
          item.className = "listItem";

          const lang = document.createElement("span");
          lang.className = "langName";
          lang.textContent = cp.description;

          const status = document.createElement("span");
          status.textContent = cp.done ? "✓" : "✕";
          status.className = cp.done ? "done" : "disabled";

          item.appendChild(lang);
          item.appendChild(status);
          listContainer.appendChild(item);
        });
      }

      wrapper.appendChild(listContainer);
      document.body.appendChild(wrapper);

      return checkpoints;
    } catch (error) {
      console.error("getTranslationsChecklist error", error);
      return null;
    }
  };

  getTranslationsChecklistData = async (issue_id) => {
    if (!issue_id) return null;
    try {
      const url = `${window.location.origin}/api/issueLog/checklist/?issue_id=${issue_id}`;
      const resp = await fetch(url, { credentials: "include" });
      if (!resp.ok) return null;
      const json = await resp.json();
      const checklists = json?.checklists || [];
      const translationsChecklist = checklists.find(
        (c) => c.title && c.title.toLowerCase().includes("translations")
      );
      if (!translationsChecklist) return null;
      const checkpoints = (translationsChecklist.checkpoints || []).map(
        (cp) => ({ description: cp.description, done: cp.done === "1" })
      );
      return checkpoints;
    } catch (e) {
      return null;
    }
  };

  createColumn = (column, issue_list) => {
    const td = document.createElement("td");
    td.className = "column-td";

    const columnTitle = document.createElement("p");
    columnTitle.textContent = column.title;
    const columnExpand = document.createElement("button");
    columnExpand.textContent = "Show All";
    columnExpand.className = "btn-task";
    columnExpand.addEventListener("click", (ev) => {
      ev.preventDefault();
      const columnTitle = columnExpand.parentElement;
      const columnDiv = columnTitle?.nextElementSibling;
      if (!columnDiv || !columnDiv.classList) return;
      const isFull = columnDiv.classList.toggle("full-height");
      columnExpand.textContent = isFull ? "Collapse" : "Show All";
    });
    columnTitle.appendChild(columnExpand);
    columnTitle.className = "column-title";

    const div = document.createElement("div");
    div.className = "column-div";

    const issueCards = [];
    // ASCENDING sort a -b
    const sort_issue = issue_list.toSorted(
      (a, b) =>
        Number(a.issue_board_column_ordering) -
        Number(b.issue_board_column_ordering)
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
    div.classList.add("issue-card");
    const isNS = this.isNewsletter(issue);
    if (isNS) {
      div.classList.add("newsletter-issue");
    }

    if (this.isMyIssue(issue)) {
      // console.log(`Twoje issue ${JSON.stringify(issue)}`);
      div.classList.toggle("my-issue");
    }

    if (this.isSunday(issue)) {
      div.classList.toggle("sunday-issue");
      div.classList.toggle("newsletter-issue");
    }
    if (this.isCampaignBanners(issue)) {
      div.classList.toggle("campaign-banners-issue");
    }
    if (this.isCGB(issue)) {
      div.classList.toggle("cgb-issue");
    }

    const a = document.createElement("a");
    a.href = "react/logs/issue_logs/" + issue.id;
    a.target = "_blank";
    a.classList.add("issue-link");

    const progress = document.createElement("div");
    progress.classList.add("issue-progress");
    progress.innerText = issue.checklists_progress;
    progress.style.width = issue.checklists_progress;

    // CONTAINER BTN
    const containerBtns = document.createElement("div");
    containerBtns.className = "container-btns";

    const comments_btn = document.createElement("button");
    comments_btn.className = "btn-icon";
    const commentsImg = document.createElement("img");
    commentsImg.width = 12;
    commentsImg.height = 12;
    commentsImg.alt = "comments";
    commentsImg.src = chrome.runtime.getURL(
      "content/start.php/svg/message.svg"
    );
    comments_btn.appendChild(commentsImg);
    comments_btn.addEventListener("click", async (ev) => {
      // reset to default icon
      comments_btn.innerHTML = "";
      const commentsImg2 = document.createElement("img");
      commentsImg2.width = 12;
      commentsImg2.height = 12;
      commentsImg2.alt = "comments";
      commentsImg2.src = chrome.runtime.getURL(
        "content/start.php/svg/message.svg"
      );
      comments_btn.appendChild(commentsImg2);
      let comments = await this.loadIssue(ev, issue.id);
      // PING every 10 seconds messages
      setInterval(async () => {
        const new_comments = await this.loadIssue(ev, issue.id);
        if (new_comments.comments.length > comments.comments.length) {
          comments = new_comments;
          // show notification variant
          comments_btn.innerHTML = "";
          const commentsNotif = document.createElement("img");
          commentsNotif.width = 12;
          commentsNotif.height = 12;
          commentsNotif.alt = "comments-notif";
          commentsNotif.src = chrome.runtime.getURL(
            "content/start.php/svg/message-notif.svg"
          );
          comments_btn.appendChild(commentsNotif);
        }
      }, 300_000);
      const unsub = this.showModal({ comments: comments.comments, issue });
    });
    comments_btn.title = "Comments";

    const dropbox_btn = document.createElement("a");
    dropbox_btn.className = "btn-icon";
    const dropboxImg = document.createElement("img");
    dropboxImg.width = 12;
    dropboxImg.height = 12;
    dropboxImg.alt = "dropbox";
    dropboxImg.src = chrome.runtime.getURL("content/start.php/svg/dropbox.svg");
    dropbox_btn.appendChild(dropboxImg);
    dropbox_btn.href = issue["Campaign dropbox"];
    dropbox_btn.target = "_blank";
    dropbox_btn.title = "Dropbox";

    const spreadsheet_btn = document.createElement("a");
    spreadsheet_btn.className = "btn-icon";
    const spreadsheetImg = document.createElement("img");
    spreadsheetImg.width = 12;
    spreadsheetImg.height = 12;
    spreadsheetImg.alt = "spreadsheet";
    spreadsheetImg.src = chrome.runtime.getURL(
      "content/start.php/svg/spreadsheet.svg"
    );
    spreadsheet_btn.appendChild(spreadsheetImg);
    spreadsheet_btn.href = issue["Translation spreadsheet newsletter"];
    spreadsheet_btn.target = "_blank";
    spreadsheet_btn.title = "Spreadsheet";

    const sa_btn = document.createElement("a");
    sa_btn.innerHTML = "SA";
    sa_btn.className = "btn-icon";
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
    issue_info.className = "issue-info";
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
    title.className = "issue-title";
    a.append(title);

    const missingTitleP = document.createElement("p");
    missingTitleP.textContent = "Missing Translations:";
    missingTitleP.className = "missing-trans-title";

    const missingChipsP = document.createElement("p");
    missingChipsP.className = "missing-chips";

    div.append(a);
    if (
      issue.checklists_progress !== "-" &&
      issue.checklists_progress !== "0%"
    ) {
      div.append(progress);
    }
    div.append(containerBtns);
    div.append(issue_info);
    issue_info.append(missingTitleP);
    issue_info.append(missingChipsP);

    (async () => {
      try {
        if (!issue.__translations_checkpoints) {
          issue.__translations_checkpoints =
            await this.getTranslationsChecklistData(issue.id);
        }
        const cps = issue.__translations_checkpoints || [];
        const missing = cps
          .filter((cp) => !cp.done)
          .map((cp) => cp.description.trim())
          .filter(Boolean);
        if (missing.length) {
          missingChipsP.innerHTML = "";
          missing.forEach((code) => {
            const chip = document.createElement("span");
            chip.className = "missingCode";
            chip.textContent = `${code}`;
            missingChipsP.appendChild(chip);
          });
        } else {
          missingTitleP.textContent = "✔ Translations done!";
          // missingChipsP.remove();
        }
      } catch (e) {}
    })();
    return div;
  };

  createComment = (comment) => {
    const div = document.createElement("div");
    div.className = "comment-card";

    const options = { defaultProtocol: "https", target: "_blank" };
    const parsed_content_with_links = linkifyHtml(comment.comment, options);

    const title = document.createElement("p");
    title.innerHTML = parsed_content_with_links.replaceAll("\n", "<br>");
    title.className = "comment-title";

    const responsible_user = document.createElement("p");
    responsible_user.innerHTML = "User: " + comment.full_username;
    responsible_user.className = "comment-user";

    const date = document.createElement("p");
    date.innerHTML = "Date: " + comment.create_date;
    date.className = "comment-date";

    div.append(title);
    div.append(responsible_user);
    div.append(date);
    return div;
  };

  issueInfo({ title, description }) {
    const row = document.createElement("div");
    row.className = "issue-info-row";

    const _title = document.createElement("p");
    _title.textContent = title.value;
    _title.className = "info-title";
    if (title.style) Object.assign(_title.style, title.style);

    const _description = document.createElement("p");
    _description.textContent = description.value;
    _description.className = "info-desc";
    if (description.style) Object.assign(_description.style, description.style);

    row.appendChild(_title);
    row.appendChild(_description);
    return [row];
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
    overlay.className = "modal-overlay";

    const div = document.createElement("div");
    div.className = "modal-panel";

    const container = document.createElement("div");
    container.className = "modal-container";

    const header_container = document.createElement("div");
    header_container.className = "modal-header";

    const title = document.createElement("a");
    title.target = "_blank";
    title.href = "react/logs/issue_logs/" + issue.id;
    title.textContent = issue.issue;
    title.className = "modal-title";

    const close_btn = document.createElement("button");
    close_btn.addEventListener("click", () => {
      overlay.classList.add("hidden");
      div.classList.add("hidden");
      document.body.style.overflow = "auto";
    });
    close_btn.className = "close-btn";
    close_btn.textContent = "X";

    header_container.append(...[title, close_btn]);

    const message_container = document.createElement("div");
    message_container.className = "message-container";

    const error_message = document.createElement("p");
    error_message.textContent = "";
    error_message.className = "error-message";

    const textareaState = {};
    const textarea = document.createElement("textarea");
    textarea.rows = 10;
    textarea.className = "modal-textarea";
    textarea.addEventListener("change", (ev) => {
      error_message.textContent = "";
      textareaState.message = ev.target.value;
    });

    const send_message = document.createElement("button");
    send_message.className = "send-message-btn";
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
      overlay.classList.add("hidden");
      div.classList.add("hidden");
      document.body.style.overflow = "auto";
    });

    div.append(header_container);
    div.append(container);
    div.append(message_container);
    container.append(...this.createComments(comments));

    document.body.append(div);
    document.body.append(overlay);

    return () => {
      overlay.classList.add("hidden");
      div.classList.add("hidden");
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
        }
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

const _issues_instance = new Issues();
// expose helper for quick access
window.getTranslationsChecklist = (id) =>
  _issues_instance.getTranslationsChecklist(id);
