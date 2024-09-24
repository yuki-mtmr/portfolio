const USER_NAME = 'yuki-mtmr'; // GitHubのユーザー名
const PER_PAGE = 100;
let allRepos = [];

// 初期メッセージ
document.getElementById('repoCount').textContent = '取得中...';

async function fetchRepos(page = 1) {
  const URL = `https://api.github.com/users/${USER_NAME}/repos?per_page=${PER_PAGE}&page=${page}`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      return allRepos; // 全てのデータを取得したらリストを返す
    } else {
      allRepos = allRepos.concat(data); // データをマージ

      // 次のページを取得
      return fetchRepos(page + 1);
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);
    document.getElementById('repoCount').textContent = 'エラーが発生しました';
    return allRepos; // エラー時もここまで取得できたリポジトリを返す
  }
}

// 非同期処理の完了を確認してからUIを更新
fetchRepos().then(allRepos => {
  const repoCount = allRepos.length;

  if (repoCount > 0) {
    // カウントアップアニメーションを開始
    $('#repoCount').countup(repoCount); // jQueryのcountupを使ってアニメーション開始
  } else {
    document.getElementById('repoCount').textContent = 'リポジトリがありません';
  }
}).catch(error => {
  document.getElementById('repoCount').textContent = 'エラーが発生しました';
});
