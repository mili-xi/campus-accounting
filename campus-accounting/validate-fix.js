const fs = require('fs');
const path = require('path');

const projectDir = '.';
const targetExtensions = ['.js', '.wxml', '.wxss', '.json', '.md'];
const overlappingChars = [
  '支出出', '收入入', '日期期', '记录录', '金额额', '预算算', '成功功', '失败败', '警告告',
  '设置置', '控制制', '消费费', '检查查', '分析析', '建议议', '统计计', '管理理', '保存存',
  '删除除', '搜索索', '筛选选', '排序序', '显示示', '隐藏藏', '加载载', '刷新新', '导出出',
  '导入入', '分享享', '打印印', '预览览', '发送送', '接收收', '复制制', '粘贴贴', '剪切切',
  '撤销销', '恢复复', '帮助助', '关于于', '权限限', '安全全', '隐私私', '条款款', '政策策',
  '服务务', '用户户', '账户户', '登录录', '注册册', '密码码', '验证证', '确认认', '取消消',
  '确定定', '选择择', '输入入', '输出出', '查看看', '编辑辑', '添加加', '修改改', '更新新',
  '提交交', '重置置', '清空空', '查找找', '替换换', '过滤滤', '浏览览', '导航航', '返回回',
  '前进进', '后退退', '首页页', '末页页', '上一页页', '下一页页', '第一页页', '最后一页页',
  '跳转转', '页面面', '窗口口', '标签签', '面板板', '菜单单', '工具栏栏', '状态栏栏',
  '标题栏栏', '滚动条条', '按钮钮', '输入框框', '文本框框', '密码框框', '选择框框',
  '复选框框', '单选框框', '下拉框框', '列表框框', '表格格', '表单单', '链接接', '图像像',
  '图片片', '视频频', '音频频', '文件件', '文件夹夹', '路径径', '地址址', '网址址', '锚点点',
  '图标标', '背景景', '前景景', '颜色色', '字体体', '大小小', '样式式', '布局局', '对齐齐',
  '间距距', '边距距', '填充充', '边框框', '阴影影', '圆角角', '渐变变', '动画画', '效果果',
  '过渡渡', '变换换', '旋转转', '缩放放', '平移移', '倾斜斜', '扭曲曲', '镜像像', '翻转转',
  '抖动动', '闪烁烁', '发光光', '模糊糊', '清晰晰', '亮度度', '对比度度', '饱和度度',
  '色调调', '色阶阶', '色彩色', '滤镜镜', '锐化化', '平滑滑', '降噪噪', '边缘缘', '轮廓廓',
  '图案案', '纹理理', '材质质', '质感感', '光影影', '明暗暗', '高光光', '反光光', '折射射',
  '反射射', '透视视', '景深景', '焦距距', '光圈圈', '快门门', '曝光光', '测光光', '对焦焦',
  '变焦变', '拍摄摄', '录像像', '录音音', '播放放', '暂停停', '停止止', '快进进', '快退退',
  '上一首首', '下一首首', '音量量', '静音音'
];

let foundErrors = false;

function checkFile(filePath) {
  // 忽略验证脚本本身的重叠字符问题
  if (path.basename(filePath) === 'validate-fix.js') {
    return;
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return;
  }

  overlappingChars.forEach(char => {
    if (content.includes(char)) {
      console.log(`文件 ${filePath} 中包含重叠字符: ${char}`);
      foundErrors = true;
    }
  });
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.git') {
        return;
      }
      traverse(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (targetExtensions.includes(ext)) {
        checkFile(filePath);
      }
    }
  });
}

console.log('检查项目中的重叠字符问题...');
traverse(projectDir);

if (!foundErrors) {
  console.log('所有重叠字符问题已修复！');
} else {
  console.log('项目中仍然存在重叠字符问题！');
}
