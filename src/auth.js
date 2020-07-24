export function getAuthForm() {
  return ` 
    <form class="mui-form" id="auth">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Пароль</label>
        </div>

        <button id="submit-btn" type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
           Войти
        </button>
    </form>

    `;
}

export function authWithEmailAndPassword(email, pas) {
  const API_KEY = "AIzaSyCoaCAN_3Wy8p5IK8BnmcxnFXRhcd5qYl8";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        pas,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Tepe": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
