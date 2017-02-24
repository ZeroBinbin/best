const fs = require('fs');
const iteratorTree = (treeStruct, childField = "children", f) =
>
{
    function search(ts, parentNode=null) {
        ts.forEach((TreeNode) = > {
            if(Array.isArray(TreeNode[childField]) && TreeNode[childField].length > 0
    )
        {
            f(TreeNode, parentNode);
            search(TreeNode[childField], TreeNode);
        }
    else
        {
            f(TreeNode, parentNode)
        }
    })
    }

    search(treeStruct)
}

module.exports = {
    '/getUserMenus': function (req, res) {
        setTimeout(() = > {
            let userMenus = fs.readFileSync('./model/getUserMenus.json', 'utf-8');
        const postData = req.body == "" ? "" : JSON.parse(`{${req.body}}`);
        let getUserMenusJson = new Function(` return ${userMenus} `);
        userMenus = getUserMenusJson();
        if (postData == "" || postData.menuId == "") {
            res.json(userMenus)
        }
        else {
            let result = userMenus;
            iteratorTree(userMenus, "subMenu", (node) = > {
                if(node.menuId === postData.menuId
        )
            {
                result = node.subMenu
            }
        })
            res.json(result)
        }
    },
        500
        )
    }
}
