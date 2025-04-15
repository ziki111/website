document.addEventListener('DOMContentLoaded', function() {
  // Обработка формы регистрации
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получаем значения полей
      const fullname = this.elements['fullname'].value;
      const email = this.elements['email'].value;
      const phone = this.elements['phone'].value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      // Сбрасываем подсветку ошибок
      document.getElementById('password').style.borderColor = '#ddd';
      document.getElementById('confirm-password').style.borderColor = '#ddd';
      
      // Проверка 1: Длина пароля
      if (password.length < 6) {
        document.getElementById('password').style.borderColor = 'red';
        alert('Пароль должен быть не менее 6 символов!');
        return;
      }
      
      // Проверка 2: Совпадение паролей
      if (password !== confirmPassword) {
        document.getElementById('password').style.borderColor = 'red';
        document.getElementById('confirm-password').style.borderColor = 'red';
        alert('Пароли не совпадают!');
        return;
      }
      
      // Проверка 3: Уникальность email
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === email)) {
        this.elements['email'].style.borderColor = 'red';
        alert('Этот email уже зарегистрирован!');
        return;
      }
      
      // Сохранение пользователя
      users.push({ fullname, email, phone, password });
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('Регистрация успешна! Перенаправляем...');
      window.location.href = 'login.html';
    });
  }

  // Обработка формы восстановления пароля
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.elements['email'].value;
      const notification = document.getElementById('notification');
      
      // Сбрасываем стили
      this.elements['email'].style.borderColor = '#ddd';
      notification.style.display = 'none';
      
      // Проверка email
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(user => user.email === email);
      
      if (userExists) {
        notification.className = 'notification success';
        notification.textContent = 'Письмо для сброса пароля отправлено на ваш email!';
        notification.style.display = 'block';
        this.reset();
        
        // Здесь можно добавить серверный запрос для отправки письма
        // Например: fetch('/api/reset-password', { method: 'POST', body: JSON.stringify({ email }) });
      } else {
        notification.className = 'notification error';
        notification.textContent = 'Пользователь с таким email не найден.';
        notification.style.display = 'block';
        this.elements['email'].style.borderColor = 'red';
      }
    });
  }
});