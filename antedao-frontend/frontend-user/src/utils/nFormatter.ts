function nFormatter(val: any, fixed = 4) {
    let nums = (val || '').split(".")
    let valueFirst = nums[0];
    const dot = val.includes(".") ? "." : "";
    const valueLast = dot + (nums[1] || "").slice(0, 4);
    if (valueFirst >= 1000000000000000000) {
        return Number((valueFirst / 1000000000000000000).toFixed(fixed).replace(/\.0$/, '')) + 'E';
    }
    if (valueFirst >= 1000000000000000) {
        return Number((valueFirst / 1000000000000000).toFixed(fixed).replace(/\.0$/, '')) + 'P';
    }
    if (valueFirst >= 1000000000000) {
        return Number((valueFirst / 1000000000000).toFixed(fixed).replace(/\.0$/, '')) + 'T';
    }
    if (valueFirst >= 1000000000) {
        return Number((valueFirst / 1000000000).toFixed(fixed).replace(/\.0$/, '')) + 'B';
    }
    if (valueFirst >= 1000000) {
        return Number((valueFirst / 1000000).toFixed(fixed).replace(/\.0$/, '')) + 'M';
    }
    if (valueFirst >= 1000) {
        return Number((valueFirst / 1000).toFixed(fixed).replace(/\.0$/, '')) + 'K';
    }
    return Number(valueFirst + valueLast.toString());
}

export default nFormatter