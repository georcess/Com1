<!-- ===== ADMIN DASHBOARD ===== -->
<section id="admin" class="section">
  <h2>Admin Dashboard 📊</h2>
  <div style="overflow-x:auto; padding: 20px;">
    <table id="order-table" style="width:100%; border-collapse: collapse; background: white; color: black;">
      <thead>
        <tr style="background-color: #4b2e2e; color: white;">
          <th style="padding: 10px; border: 1px solid #ddd;">Date/Time</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Customer</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Orders</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Total Price</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Action</th>
        </tr>
      </thead>
      <tbody id="admin-order-list">
      </tbody>
    </table>
    <button onclick="clearAllOrders()" style="margin-top: 20px; background: red; color: white;">Clear All Records</button>
  </div>
</section>
