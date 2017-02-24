/**
 * Created by Administrator on 2017/2/10 0010.
 */
/**
 *  将数组1和数组2按照attr字段拼合成一个对象数组
 * @param arr1
 * @param arr2
 * @param attr
 * @returns {Array}
 */
const combine = (arr1 , arr2 , attr) =
>
{
    let retArr = [];
    arr1.forEach((a1) = > {
        arr2.forEach((a2) = > {
        if(a1[attr] === a2[attr]
)
    {
        retArr.push(Object.assign(a1, a2))
    }
})
})

    return retArr
}

/**
 * 找到数组中字段attr值为value的元素
 * @param arr
 * @param attr
 * @param value
 * @returns {*}
 */
const find = ( arr , attr , value) =
>
{
    let ret = null;
    arr.forEach((a) = > {
        if(a[attr] === value
)
    {
        ret = a
    }
})
    return ret
}
/**
 * 深度遍历树treeStruct，以childField为子元素集合,对所有元素执行回调f
 * @param treeStruct
 * @param childField
 * @param f(TreeNode ,parentNode)
 */
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

export {
    combine,
    find,
    iteratorTree
}
