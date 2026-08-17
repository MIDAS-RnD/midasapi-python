// Renders an interactive ECharts tree into every element with id/class "org-tree".
// The JSON source is read from the element's data-src attribute.
//
// Works with both a normal page load and MkDocs Material's instant navigation
// (which swaps page content without a full reload).

(function () {
  function renderTree(el) {
    if (!el || el.dataset.rendered === "true") return;
    if (typeof echarts === "undefined") return; // ECharts not loaded yet
    el.dataset.rendered = "true";

    var src = el.getAttribute("data-src");
    var chart = echarts.init(el);
    chart.showLoading();

    fetch(src)
      .then(function (r) {
        if (!r.ok) throw new Error("Could not load " + src + " (" + r.status + ")");
        return r.json();
      })
      .then(function (data) {
        chart.hideLoading();
        chart.setOption(buildOption(data));
      })
      .catch(function (err) {
        chart.hideLoading();
        el.innerHTML =
          '<p style="color:#c0392b;font-family:sans-serif;">' +
          "Failed to load tree data: " + err.message + "</p>";
      });

    // Keep the chart sized to its container.
    window.addEventListener("resize", function () {
      chart.resize();
    });
  }

  // Map a node's "category" to a color. Add/rename freely.
  var CATEGORY_COLORS = {
    root: "#2c3e50",
    engineering: "#5470c6",
    sales: "#91cc75",
    marketing: "#ee6666"
  };

  // Walk the tree and give each node an itemStyle color.
  // Priority: explicit node.itemStyle.color > category color > inherited category.
  function applyColors(node, inheritedColor) {
    var color = inheritedColor;
    if (node.category && CATEGORY_COLORS[node.category]) {
      color = CATEGORY_COLORS[node.category];
    }
    if (node.itemStyle && node.itemStyle.color) {
      color = node.itemStyle.color; // per-node override wins
    }
    if (color) {
      node.itemStyle = Object.assign({}, node.itemStyle, { color: color });
      // Tint the connector line into this node to match.
      node.lineStyle = Object.assign({}, node.lineStyle, { color: color });
    }
    (node.children || []).forEach(function (child) {
      applyColors(child, color); // children inherit unless they set their own
    });
  }

  function buildOption(data) {
    applyColors(data, null);
    return {
      // Tooltip shows the node's info on hover.
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        borderColor: "#5470c6",
        formatter: function (params) {
          var info = (params.data && params.data.info) || {};
          var rows = [
            ["Role", info.title],
            ["Person", info.person],
            ["Location", info.location],
            ["Team size", info.team]
          ];
          var body = rows
            .filter(function (row) { return row[1] !== undefined && row[1] !== null; })
            .map(function (row) {
              return (
                '<div style="margin:2px 0;">' +
                '<span style="color:#888;">' + row[0] + ":</span> " +
                "<strong>" + row[1] + "</strong></div>"
              );
            })
            .join("");
          return (
            '<div style="font-size:13px;line-height:1.4;">' +
            '<div style="font-weight:700;margin-bottom:4px;">' + params.name + "</div>" +
            body +
            "</div>"
          );
        }
      },
      series: [
        {
          type: "tree",
          data: [data],
          top: "5%",
          left: "12%",
          bottom: "5%",
          right: "18%",
          symbolSize: 12,
          orient: "LR", // left-to-right
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 13
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left"
            }
          },
          emphasis: {
            focus: "descendant" // highlight the branch under the hovered node
          },
          expandAndCollapse: true, // click a node to collapse/expand
          initialTreeDepth: 2,
          animationDuration: 550,
          animationDurationUpdate: 750,
          roam: true // scroll to zoom, drag to pan
        }
      ]
    };
  }

  function renderAll() {
    document.querySelectorAll("#org-tree, .org-tree").forEach(renderTree);
  }

  // Initial load.
  document.addEventListener("DOMContentLoaded", renderAll);
  // MkDocs Material instant navigation (if enabled).
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(renderAll);
  }
  // Fallback in case the script runs after DOMContentLoaded already fired.
  if (document.readyState !== "loading") renderAll();
})();
